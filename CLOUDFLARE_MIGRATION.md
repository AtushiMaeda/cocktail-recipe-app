# Cloudflare移行 設計案

> **前提**: 本アプリはAWSインフラ（`terraform/`）をまだ一度も`apply`しておらず、本番稼働実績もない。
> そのためデータ移行・DNSカットオーバー・ダウンタイム対応は不要で、**クリーンな新規構築**として設計する。
> `terraform/`配下のAWS構成は、この移行が完了次第、破棄（削除）してよい前提とする。

## 1. なぜCloudflareか（前回調査の要約）

現行のAWS設計（VPC + ALB + ECS Fargate + RDS）は、トラフィックがほぼゼロでも月$40〜45程度の固定費が発生する構造。個人開発規模のアプリには過剰。

Cloudflareに寄せると、フロントは完全無料、バックエンドもWorkers Paid ($5/月)＋従量課金、DBはNeon無料枠、画像はR2でegress無料となり、**月$5〜10程度**に収まる見込み。加えてVPC/ALB/ACM/ECR/IAMロールといったAWS特有の運用対象がまるごと不要になる。

## 2. アーキテクチャ対応表

| レイヤ | AWS設計（未適用・破棄予定） | Cloudflare移行後 |
|---|---|---|
| フロントエンド配信 | S3 + CloudFront + ACM | **Cloudflare Pages** |
| バックエンドAPI | ECS Fargate (0.25vCPU/512MB) + ALB | **Cloudflare Containers**（既存Dockerfileを流用） |
| データベース | RDS PostgreSQL 17.4 (`db.t4g.micro`) | **Neon**（サーバーレスPostgres、東京リージョンは無くシンガポールが最寄り） |
| 画像ストレージ | S3 + Shrine | **R2**（S3互換APIなのでShrine側はほぼ無改修） |
| シークレット管理 | Secrets Manager | `wrangler secret put`（Worker側のシークレットストア） |
| DNS/証明書 | Route53 + ACM | Cloudflare DNS（自動TLS、証明書管理不要） |
| CI/CD | GitHub Actions → ECR push → ECS force-deploy、S3 sync → CloudFront invalidation | GitHub Actions → `wrangler deploy`（Pages・Containers共に1コマンド） |
| IaC | `terraform/`（AWSプロバイダ、17ファイル） | `wrangler.toml`（Cloudflareは基本Wrangler設定が正。Terraformプロバイダは任意・今回は必須としない） |

## 3. コンポーネント別詳細設計

### 3.1 フロントエンド → Cloudflare Pages

- Cloudflare PagesプロジェクトをGitHubリポジトリに直接連携
- ビルドコマンド: `npm run build`（既存のまま）、出力ディレクトリ: `dist`
- 環境変数 `VITE_API_BASE_URL` をContainers側の公開URLに向ける
- 静的アセットは無料枠で無制限配信のため、CloudFront相当の設定は不要
- **既存の`.env.production`のプレースホルダー課題（`YOUR_DOMAIN_HERE`）は、この移行のタイミングで解消できる**

### 3.2 バックエンド → Cloudflare Containers

既存の`backend/Dockerfile`は本番ステージがマルチステージビルド・非rootユーザー実行・`EXPOSE 3000`と、Containers向けの要件を素で満たしとる構成なので、**大きな書き換えは不要**な見込み。

新規に必要なもの:

- `wrangler.toml`（Workerとコンテナの結びつけ設定）
  ```toml
  name = "cocktail-api"
  main = "src/index.ts"
  compatibility_date = "2026-09-29"

  [[containers]]
  class_name = "CocktailApiContainer"
  image = "./backend/Dockerfile"
  max_instances = 3

  [[durable_objects.bindings]]
  name = "COCKTAIL_API"
  class_name = "CocktailApiContainer"

  [exports.CocktailApiContainer]
  type = "durable-object"
  storage = "sqlite"
  ```
- Worker側エントリスクリプト（`src/index.ts`）: リクエストをコンテナのポート3000にフォワードするだけの薄い層
- 環境変数は非機密を`wrangler.toml [vars]`、機密（`JWT_SECRET`・`DATABASE_URL`）は`wrangler secret put`で投入

**要検証事項**: Containersのヘルスチェック仕様・コールドスタート挙動は現行ドキュメントで最終確認が必要（GA後まだ5ヶ月程度で情報の変化が速い領域）。

### 3.3 データベース → Neon

- Neonプロジェクトを新規作成し`DATABASE_URL`を取得（既存データは無いため移行作業自体が不要、`rake db:create db:migrate db:seed`を実行するだけ）
- **リージョン注意**: NeonはAWS上でホストされとるが東京リージョンが無く、日本から一番近いのはシンガポール（ap-southeast-1）。現行のRDS(ap-northeast-1)より物理的に遠くなる分、DBレイテンシは増える見込み。個人開発アプリの規模なら体感差は小さいと思われるが、気になるならHyperdrive導入で緩和可能
- **Hyperdriveは今回は不要と判断**: HyperdriveはWorkersのisolateモデル（リクエストごとに新規コネクション）向けの最適化が主目的。Containersは常駐プロセスでPumaがActiveRecordのコネクションプールを維持できるため、恩恵が薄い。後々レイテンシが気になれば追加検討で良い

### 3.4 画像ストレージ → R2

現行の`backend/config/environment.rb`は既に`Shrine::Storage::S3`＋`aws-sdk-s3`を使っとって、R2はS3互換APIなので**設定差分のみで移行できる**:

```ruby
s3_opts = {
  bucket: ENV["R2_BUCKET_NAME"],
  region: "auto",
  endpoint: "https://#{ENV['R2_ACCOUNT_ID']}.r2.cloudflarestorage.com",
  access_key_id: ENV["R2_ACCESS_KEY_ID"],
  secret_access_key: ENV["R2_SECRET_ACCESS_KEY"],
  force_path_style: true
}
Shrine.storages = {
  cache: Shrine::Storage::S3.new(prefix: "cache", copy_options: {}, **s3_opts),
  store: Shrine::Storage::S3.new(copy_options: {}, **s3_opts)
}
```

**既知の落とし穴**: R2はShrineのデフォルト`tagging_directive`コピーオプションに未対応のため、`copy_options: {}`で明示的に無効化する必要がある。Gemfileの変更は不要（`aws-sdk-s3`はそのまま使える）。

### 3.5 CI/CD → `.github/workflows/deploy.yml`全面刷新

現行はAWS認証 → ECR push → ECS force-deploy / S3 sync → CloudFront invalidationという構成。Cloudflareでは大幅に単純化できる:

- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` をGitHub Secretsに追加
- フロント: `wrangler pages deploy dist`（またはPages側のGit連携に任せてAction自体を削除する選択肢もあり）
- バックエンド: `wrangler deploy`（Dockerビルド〜コンテナ登録まで1コマンドで完結、ECR相当の手動pushステップが不要になる）

### 3.6 AWS terraformの扱い

一度も`apply`していない＝実際のAWSリソースは何も存在しないため、**破棄コストはゼロ**。`terraform/`ディレクトリはこの移行完了後に削除し、README.md/DEPLOY.mdもCloudflare向けに書き換える想定（実装フェーズの作業として別途対応）。

## 4. 実行フェーズ案

| フェーズ | 内容 | 依存 | 状況 |
|---|---|---|---|
| 0 | Cloudflareアカウント作成・Workers Paidプラン加入、Neonプロジェクト作成、R2バケット作成 | なし | **要ユーザー対応**（後述） |
| 1 | フロントエンド → Pages移行 | フェーズ0 | **コード実装済み**（下記4.1） |
| 2 | 画像ストレージ → R2移行（`environment.rb`/`image_uploader.rb`まわりの差分適用） | フェーズ0 | 未着手 |
| 3 | データベース → Neon移行（新規セットアップ、シード投入） | フェーズ0 | 未着手 |
| 4 | バックエンド → Containers移行（`wrangler.toml`・Worker追加、Dockerfile検証） | フェーズ2, 3 | 未着手 |
| 5 | CI/CD書き換え（`deploy.yml`） | フェーズ1, 4 | フロント分のみ完了 |
| 6 | `terraform/`撤去、README/DEPLOY.md更新 | フェーズ5完了後 | 未着手 |

フェーズ1・2・3は互いに独立しとるので並行に進めてよか。フェーズ4はストレージとDBの向き先が固まってから着手するのが安全。

### 4.1 フェーズ1 実装内容（完了）

以下をリポジトリに追加・変更した:

- `wrangler.toml`（新規） — Pagesプロジェクト設定（`pages_build_output_dir = "dist"`）
- `.github/workflows/deploy-pages.yml`（新規） — `npm run build` → `wrangler pages deploy`
- `.github/workflows/deploy.yml`（改修） — フロントエンドジョブを削除しバックエンド(AWS)のみに縮小。フェーズ4完了後に全体削除予定
- `.env.production`（コメント追記） — `VITE_API_BASE_URL`はフェーズ4完了までは暫定値、CI側でSecrets上書きする方針を明記
- `package.json` — `wrangler`をdevDependencyに追加

**ユーザー側の残タスク**（Claude Codeからは実行不可、Cloudflareアカウントでの操作が必要）:

1. Cloudflareアカウント作成・Workers Paidプラン（$5/月）加入
2. Cloudflare Pagesでプロジェクト作成（プロジェクト名: `cocktail-recipe-app`）
3. GitHub Secretsに以下を追加:
   - `CLOUDFLARE_API_TOKEN`（Pages編集権限のあるAPIトークン）
   - `CLOUDFLARE_ACCOUNT_ID`
   - `VITE_API_BASE_URL`（バックエンドはフェーズ4まで未構築のため、それまでは`http://localhost:3000`等の仮値でも可）
4. 上記設定後、`main`にpushすると`deploy-pages.yml`が動きPagesへ自動デプロイされる

**副産物**: `npm install -D wrangler`実行時に、wrangler導入前から存在していた開発ツール依存の脆弱性14件（Critical 1・High 10含む、`vite`/`postcss`/`rollup`/`tar`等の間接依存）を発見。`npm audit fix`で17件→3件まで解消済み（Critical/Highは全解消）。残る3件はwrangler自体の依存(`undici`のDoS、Moderate)で、`--force`でのwranglerダウングレードが必要なため未対応のまま保留（詳細は本ファイル運用者への報告を参照）。

## 5. ユーザー側で決めておくべきこと

- ドメイン管理をCloudflareへ完全移管するか（Route53からのDNS移管、または現行DNSはそのままでCNAME委譲のみか）
- Pagesのデプロイ経路をGitHub Actions経由に統一するか、Cloudflare純正のGit連携（Actions不要）に任せるか
- Neonのプラン（無料枠で様子見 or 最初から有料プランか）

---

*この設計書は調査・比較検討の結果を踏まえた提案であり、実装（コード変更・実際のCloudflareリソース作成）はまだ行っていない。*

🤖 Generated with [Claude Code](https://claude.com/claude-code)

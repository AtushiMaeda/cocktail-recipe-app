# カクテルレシピアプリ

PC・スマートフォンで使えるレスポンシブなカクテルレシピアプリです。フロントエンド（React/Vite）とバックエンド（Sinatra API）で構成され、AWS上に本番デプロイされます。

## 機能

- レスポンシブデザイン（PC・スマートフォン対応）
- 110種類以上の有名カクテルレシピを収録
- カクテル名・カテゴリー・アルコール度数での検索・フィルタリング
- スマホを振ってランダムカクテルを表示（Device Motion API）
- ユーザー登録・ログイン（JWT認証）
- オリジナルカクテルレシピの作成・編集・削除
- 画像アップロード（Shrine / S3）

---

## 技術スタック

| 層 | 技術 |
|---|---|
| **Frontend** | React 19, TypeScript 5.8, Vite 7, Tailwind CSS v4 |
| **Backend** | Ruby 3.4.6, Sinatra 4.1, sinatra-activerecord (ActiveRecord 8.0), Puma 6 |
| **DB** | PostgreSQL 17 |
| **認証** | BCrypt + JWT（自前実装） |
| **画像** | Shrine 3.6（ローカル or S3） |
| **Infra** | AWS: CloudFront, S3, ALB, ECS Fargate, RDS PostgreSQL, ECR, Route53, ACM, Secrets Manager |
| **IaC** | Terraform |
| **CI/CD** | GitHub Actions |

---

## アーキテクチャ

```
【ローカル開発】
 Browser (localhost:5173)
   │  Vite dev server (React/TypeScript)
   │  VITE_API_BASE_URL=http://localhost:3000
   ▼
 Sinatra API (localhost:3000)
   ├─ PostgreSQL 17 (localhost:5432)
   └─ Shrine → backend/public/uploads/

【本番 (AWS)】
 Browser
   │
   ▼
 Route53 (独自ドメイン)
   ├─ CloudFront + S3 ─────────── React SPA (静的ファイル)
   └─ ALB (HTTPS:443)
         ▼
       ECS Fargate (Sinatra / Puma)
         ├─ RDS PostgreSQL
         └─ Shrine → S3 (画像バケット)
```

---

## ディレクトリ構成

```
cocktail-recipe-app/
├── src/                        # フロントエンド (React/TypeScript)
│   ├── App.tsx                 # メインコンポーネント
│   ├── api/                    # APIクライアント (cocktailApi.ts, authApi.ts)
│   ├── components/             # UIコンポーネント
│   ├── contexts/               # React Context (AuthContext.tsx)
│   ├── types/                  # 型定義
│   └── utils/
├── backend/                    # バックエンド (Sinatra)
│   ├── app/
│   │   ├── models/             # ActiveRecord モデル
│   │   ├── routes/             # Sinatra ルート定義
│   │   ├── helpers/            # auth_helper.rb, pagination_helper.rb
│   │   ├── serializers/
│   │   └── uploaders/          # Shrine uploader
│   ├── config/                 # database.yml, puma.rb, environment.rb
│   ├── db/                     # migrations, schema.rb, seeds.rb
│   │   └── seed_data/cocktails.json
│   ├── app.rb                  # Sinatra::Base エントリポイント
│   ├── config.ru               # Rack設定
│   ├── Gemfile
│   └── Dockerfile
├── terraform/                  # AWS インフラ定義
├── .github/workflows/          # CI/CD (deploy.yml)
├── Procfile.dev                # ローカル同時起動定義
├── DEPLOY.md                   # AWSデプロイ手順書
└── MOBILE_TESTING.md           # スマホ実機テスト手順
```

---

## 前提環境

- macOS
- Node.js 22+
- Ruby 3.4.6（Homebrew）
- PostgreSQL 17（Homebrew）

```bash
# PATHに追加（~/.zshrc 等に記載推奨）
export PATH="/opt/homebrew/opt/postgresql@17/bin:/opt/homebrew/lib/ruby/gems/3.4.0/bin:/opt/homebrew/Cellar/ruby/3.4.6/bin:$PATH"
```

---

## ローカル開発

### 1. リポジトリクローン & 依存インストール

```bash
git clone <repo-url>
cd cocktail-recipe-app

# フロントエンド
npm ci

# バックエンド
cd backend && bundle install
```

### 2. PostgreSQL 起動

```bash
brew services start postgresql@17
```

### 3. DB作成・マイグレーション・シードデータ投入

```bash
cd backend
bundle exec rake db:create db:migrate db:seed
```

### 4. 環境変数

フロントエンドは `.env.development` が既に用意されています:

```
VITE_API_BASE_URL=http://localhost:3000
```

バックエンドは `backend/.env` を作成してください:

```
JWT_SECRET=your-local-secret-key
# S3を使わない場合は以下は不要（ローカルのpublic/uploadsに保存されます）
# S3_BUCKET_NAME=
# AWS_REGION=
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
```

### 5. サーバー起動

**個別起動:**

```bash
# フロントエンド (ポート5173)
npm run dev

# バックエンド (ポート3000) — 別ターミナルで
cd backend
PATH="/opt/homebrew/opt/postgresql@17/bin:/opt/homebrew/lib/ruby/gems/3.4.0/bin:/opt/homebrew/Cellar/ruby/3.4.6/bin:$PATH" \
  bundle exec puma -C config/puma.rb -p 3000
```

**同時起動 (foreman / overmind):**

```bash
# foreman の場合
gem install foreman
foreman start -f Procfile.dev

# overmind の場合
brew install overmind
overmind start -f Procfile.dev
```

### 6. スマホ実機テスト

シェイク機能など Device Motion API を実機でテストするには、HTTPSが必要です。→ [MOBILE_TESTING.md](./MOBILE_TESTING.md) 参照

---

## API エンドポイント

### 認証

| メソッド | パス | 説明 | 認証 |
|---|---|---|---|
| `POST` | `/api/v1/auth/sign_up` | ユーザー登録 | 不要 |
| `POST` | `/api/v1/auth/sign_in` | ログイン（JWTをレスポンスヘッダで返す） | 不要 |
| `DELETE` | `/api/v1/auth/sign_out` | ログアウト（JTI再生成でトークン無効化） | 必要 |
| `GET` | `/api/v1/auth/me` | 現在のユーザー情報 | 必要 |

### カクテル

| メソッド | パス | 説明 | 認証 |
|---|---|---|---|
| `GET` | `/api/v1/cocktails` | 一覧取得（検索・ページング） | 不要 |
| `GET` | `/api/v1/cocktails/random` | ランダム1件取得 | 不要 |
| `GET` | `/api/v1/cocktails/:id` | 詳細取得 | 不要 |
| `POST` | `/api/v1/cocktails` | 新規作成 | 必要 |
| `PATCH` | `/api/v1/cocktails/:id` | 更新（所有者のみ） | 必要 |
| `DELETE` | `/api/v1/cocktails/:id` | 削除（所有者のみ） | 必要 |
| `POST` | `/api/v1/cocktails/:id/upload_image` | 画像アップロード | 必要 |

**GET /api/v1/cocktails クエリパラメータ:**

| パラメータ | 説明 | デフォルト |
|---|---|---|
| `search` | カクテル名での部分一致検索 | — |
| `category` | カテゴリーで絞り込み | — |
| `alcoholContent` | アルコール度数で絞り込み | — |
| `page` | ページ番号 | 1 |
| `per_page` | 1ページあたりの件数 | 200 |

### その他

| メソッド | パス | 説明 |
|---|---|---|
| `GET` | `/up` | ヘルスチェック（ALB/ECS用） |

---

## 認証フロー

1. `POST /api/v1/auth/sign_in` でログイン
2. レスポンスヘッダ `Authorization: Bearer <JWT>` にトークンが返される
3. 以降のリクエストは `Authorization: Bearer <JWT>` ヘッダを付けて送信
4. `DELETE /api/v1/auth/sign_out` でログアウト → サーバー側でUser.jtiを再生成し、既存トークンを無効化

| 設定 | 値 |
|---|---|
| アルゴリズム | HS256 |
| 有効期限 | 24時間 |
| シークレット | 環境変数 `JWT_SECRET` |

---

## 画像アップロード (Shrine)

- `S3_BUCKET_NAME` が設定されている場合 → **S3に保存**
- 未設定の場合 → `backend/public/uploads/` に**ローカル保存**
- 許可形式: jpeg, png, webp, gif
- 最大サイズ: 10MB

---

## DBスキーマ概要

### users

| カラム | 型 | 説明 |
|---|---|---|
| `email` | string | ユニーク |
| `encrypted_password` | string | BCryptハッシュ |
| `jti` | string | JWTトークン無効化用ID |
| `name` | string | 表示名 |

### cocktails

| カラム | 型 | 説明 |
|---|---|---|
| `name` / `name_en` | string | 日本語名・英語名 |
| `description` | text | 説明 |
| `ingredients` | jsonb | 材料リスト（GINインデックス付き） |
| `instructions` | text[] | 作り方ステップ |
| `glass` | string | グラス種類 |
| `category` | string | カテゴリー |
| `alcohol_content` | string | アルコール度数区分 |
| `flavors` | text[] | 風味タグ |
| `is_original` | boolean | ユーザー作成レシピフラグ |
| `user_id` | bigint | 作成者（シードデータはnil） |
| `image_file_data` | jsonb | Shrine画像データ |

---

## 本番デプロイ (AWS)

詳細手順は [DEPLOY.md](./DEPLOY.md) を参照してください。

| コンポーネント | 構成 |
|---|---|
| **フロントエンド** | S3静的ホスティング → CloudFront（独自ドメイン + ACM） |
| **API** | ECR → ECS Fargate（256CPU/512MB） ← ALB（HTTPS） |
| **DB** | RDS PostgreSQL |
| **画像** | S3（Shrine経由） |
| **シークレット** | AWS Secrets Manager |
| **DNS** | Route53 |

---

## CI/CD

`.github/workflows/deploy.yml` — `main` ブランチへのpushでトリガー:

| ジョブ | 処理 |
|---|---|
| `deploy-frontend` | `npm run build` → S3 sync → CloudFront invalidation |
| `deploy-backend` | Dockerビルド → ECRプッシュ → `ecs update-service --force-new-deployment` |

**必要なGitHub Secrets:**

| シークレット名 | 説明 |
|---|---|
| `AWS_ACCESS_KEY_ID` | デプロイ用IAMキー |
| `AWS_SECRET_ACCESS_KEY` | デプロイ用IAMシークレット |
| `FRONTEND_BUCKET_NAME` | フロントエンド用S3バケット名 |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFrontディストリビューションID |
| `VITE_API_BASE_URL` | 本番APIのURL（例: `https://api.example.com`） |

---

## 環境変数一覧

### フロントエンド

| 変数名 | 説明 | デフォルト（開発） |
|---|---|---|
| `VITE_API_BASE_URL` | バックエンドAPIのベースURL | `http://localhost:3000` |

### バックエンド

| 変数名 | 説明 | デフォルト（開発） |
|---|---|---|
| `DATABASE_URL` | PostgreSQL接続URL | `database.yml` の設定 |
| `JWT_SECRET` | JWT署名シークレット | `dev-secret-please-change-in-production` |
| `RACK_ENV` | 実行環境 | `development` |
| `S3_BUCKET_NAME` | 画像保存用S3バケット名 | 未設定（ローカル保存） |
| `AWS_REGION` | AWSリージョン | — |
| `AWS_ACCESS_KEY_ID` | AWS認証情報 | — |
| `AWS_SECRET_ACCESS_KEY` | AWS認証情報 | — |

---

## テスト・Lint

```bash
# フロントエンド Lint
npm run lint

# フロントエンド 型チェック
npm run build  # tsc -b を含む
```

バックエンドの自動テストは現状未整備です。

---

## 既知の整合性課題（後続タスク）

以下はコードに残存している課題です。機能には影響しませんが、将来的に修正が必要です:

- **`terraform/ecs.tf`**: 環境変数に `RAILS_ENV`, `RAILS_MAX_THREADS`, `RAILS_SERVE_STATIC_FILES`、secretsに `RAILS_MASTER_KEY` がRails移行前の名残で残存。Sinatraは `RACK_ENV` / `PUMA_THREADS` / `JWT_SECRET` を参照するため未使用
- **`terraform/variables.tf`**: `rails_master_key` 変数が同様に残存
- **`backend/db/schema.rb`**: Devise 由来カラム（`reset_password_token`, `reset_password_sent_at`, `remember_created_at`）が `users` テーブルに残置（アプリは未使用）
- **`.env.production`**: `VITE_API_BASE_URL` が `YOUR_DOMAIN_HERE` プレースホルダーのまま
- **`dist/`**: ビルド成果物がリポジトリにコミットされている（`.gitignore` への追加を推奨）

---

## 関連ドキュメント

- [DEPLOY.md](./DEPLOY.md) — AWSデプロイ詳細手順（Terraform → ECR → ECS → S3 → CloudFront → GitHub Secrets）
- [MOBILE_TESTING.md](./MOBILE_TESTING.md) — スマホ実機でDevice Motion APIをテストする手順
- [backend/README.md](./backend/README.md) — Sinatraバックエンド詳細

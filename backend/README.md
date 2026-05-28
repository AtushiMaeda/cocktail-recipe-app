# バックエンド (Sinatra API)

Sinatra 4.1 製の JSON API サーバーです。`/api/v1/...` エンドポイントを提供します。

## 技術スタック

| 技術 | バージョン |
|---|---|
| Ruby | 3.4.6 |
| Sinatra | 4.1 |
| sinatra-activerecord (ActiveRecord) | 8.0 |
| Puma | 6 |
| PostgreSQL | 17 |
| 認証 | BCrypt + JWT（自前実装） |
| 画像ストレージ | Shrine 3.6 |
| CORS | rack-cors 2.0 |

---

## ディレクトリ構成

```
backend/
├── app/
│   ├── models/             # ActiveRecord モデル (user.rb, cocktail.rb)
│   ├── routes/             # Sinatra ルート定義
│   │   ├── auth_routes.rb
│   │   └── cocktail_routes.rb
│   ├── helpers/
│   │   ├── auth_helper.rb      # JWT発行・検証
│   │   └── pagination_helper.rb
│   ├── serializers/
│   │   └── cocktail_serializer.rb
│   └── uploaders/
│       └── image_uploader.rb   # Shrine uploader
├── config/
│   ├── database.yml
│   ├── environment.rb      # 依存 require とDB接続
│   └── puma.rb
├── db/
│   ├── migrate/
│   ├── schema.rb
│   ├── seeds.rb
│   └── seed_data/
│       └── cocktails.json  # シードデータ本体（110件）
├── app.rb                  # Sinatra::Base エントリポイント（ヘルスチェック等）
├── config.ru               # Rack設定（ルートマウント）
├── Gemfile
├── Rakefile
└── Dockerfile
```

---

## セットアップ

### 1. Ruby 3.4.6 のインストール確認

```bash
ruby -v  # => ruby 3.4.6
```

rbenv / mise を使う場合は `.ruby-version` が自動で読まれます。

### 2. 依存 gem のインストール

```bash
cd backend
bundle install
```

### 3. PostgreSQL 17 の起動

```bash
brew services start postgresql@17
```

### 4. 環境変数の設定

`backend/.env` を作成してください（`dotenv` gem で自動読み込み）:

```
JWT_SECRET=your-local-secret-key
# S3を使わない場合は不要（ローカルのpublic/uploadsに保存）
# S3_BUCKET_NAME=
# AWS_REGION=
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
```

### 5. DB 作成・マイグレーション・シードデータ投入

```bash
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
```

---

## 起動

```bash
# 通常起動（ポート3000）
bundle exec puma -C config/puma.rb -p 3000

# ホットリロードあり（開発時）
bundle exec rerun --background -- puma -C config/puma.rb -p 3000
```

PATH に postgresql@17 と ruby の bin が含まれていない場合は先頭に追加してください:

```bash
PATH="/opt/homebrew/opt/postgresql@17/bin:/opt/homebrew/lib/ruby/gems/3.4.0/bin:/opt/homebrew/Cellar/ruby/3.4.6/bin:$PATH" \
  bundle exec puma -C config/puma.rb -p 3000
```

フロントエンドと同時に起動する場合はルートの `Procfile.dev` を使います（詳細はルートの [README](../README.md) を参照）。

---

## 環境変数

| 変数名 | 説明 | デフォルト（開発） |
|---|---|---|
| `DATABASE_URL` | PostgreSQL接続URL | `database.yml` の設定（`backend_development`） |
| `JWT_SECRET` | JWT署名シークレット | `dev-secret-please-change-in-production` |
| `RACK_ENV` | 実行環境 | `development` |
| `S3_BUCKET_NAME` | 画像保存用S3バケット名 | 未設定（ローカル保存） |
| `AWS_REGION` | AWSリージョン | — |
| `AWS_ACCESS_KEY_ID` | AWS認証情報 | — |
| `AWS_SECRET_ACCESS_KEY` | AWS認証情報 | — |

---

## 主要 Rake タスク

```bash
bundle exec rake db:create       # DB作成
bundle exec rake db:migrate      # マイグレーション実行
bundle exec rake db:seed         # シードデータ投入（冪等）
bundle exec rake db:rollback     # 直前のマイグレーションを戻す
bundle exec rake db:reset        # DB削除 → 作成 → マイグレーション → seed
bundle exec rake db:schema:load  # schema.rb からスキーマを再構築
```

---

## API エンドポイント

エンドポイントの一覧と説明はルートの [README](../README.md#api-エンドポイント) を参照してください。

---

## シードデータ

`db/seed_data/cocktails.json` に110件のカクテルデータが格納されています。`db:seed` は `find_or_create_by(name:, name_en:)` で冪等に実行できます（重複投入なし）。シードデータの `user_id` はすべて `nil` です。

---

## デプロイ

本番環境では `Dockerfile` を使って Docker イメージをビルドし、ECR に push して ECS Fargate で動作します。詳細は [DEPLOY.md](../DEPLOY.md) を参照してください。

```bash
# ローカルでの動作確認用ビルド例
docker build -t cocktail-backend .
docker run -p 3000:3000 -e RACK_ENV=development -e JWT_SECRET=test cocktail-backend
```

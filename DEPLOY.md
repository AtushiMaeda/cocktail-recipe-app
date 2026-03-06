# AWS デプロイ手順

## 前提条件

- AWS CLI v2 (設定済み)
- Terraform >= 1.5
- Docker
- `gh` (GitHub CLI) ※ シークレット設定に使用

---

## Step 1: ドメイン購入 (手動)

1. AWS コンソール → Route 53 → ドメインの登録
2. 希望ドメイン (例: `cocktail-app.com`) を購入
3. 購入後、ホストゾーンが自動作成される

---

## Step 2: Terraform state 用 S3 バケット作成 (手動)

```bash
aws s3api create-bucket \
  --bucket my-terraform-state-cocktail \
  --region ap-northeast-1 \
  --create-bucket-configuration LocationConstraint=ap-northeast-1

aws s3api put-bucket-versioning \
  --bucket my-terraform-state-cocktail \
  --versioning-configuration Status=Enabled
```

---

## Step 3: Terraform でインフラ構築

```bash
cd terraform

# terraform.tfvars を作成 (example をコピーして編集)
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvars を編集して実際の値を入力

# 初期化 (state バケットを指定)
terraform init \
  -backend-config="bucket=my-terraform-state-cocktail" \
  -backend-config="key=cocktail-app/terraform.tfstate" \
  -backend-config="region=ap-northeast-1"

# 確認
terraform plan

# 適用 (ACM 証明書検証に数分かかる)
terraform apply
```

### Route 53 ホストゾーンが既に存在する場合

ドメイン購入時に自動作成されたホストゾーンをインポートする:

```bash
# ホストゾーン ID を確認
aws route53 list-hosted-zones --query 'HostedZones[?Name==`cocktail-app.com.`].Id' --output text

# インポート
terraform import aws_route53_zone.main Z1234567890ABC
```

---

## Step 4: Gemfile.lock を更新してイメージをビルド

```bash
cd backend
bundle install
```

---

## Step 5: Docker イメージを ECR へプッシュ (初回)

```bash
# ECR リポジトリ URL を取得
ECR_URL=$(cd terraform && terraform output -raw ecr_repository_url)
AWS_REGION=ap-northeast-1

# ECR ログイン
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $ECR_URL

# イメージをビルド・プッシュ (Apple Silicon の場合は --platform linux/amd64 必須)
cd backend
docker build --platform linux/amd64 -t $ECR_URL:latest .
docker push $ECR_URL:latest
```

---

## Step 6: ECS サービスを起動して DB マイグレーション

```bash
# ECS サービスを強制再デプロイ
aws ecs update-service \
  --cluster cocktail-cluster \
  --service cocktail-api \
  --force-new-deployment \
  --region ap-northeast-1

# タスクが起動するまで待機 (docker-entrypoint が db:prepare を自動実行)
aws ecs wait services-stable \
  --cluster cocktail-cluster \
  --services cocktail-api \
  --region ap-northeast-1
```

---

## Step 7: フロントエンドをビルドして S3 にデプロイ

```bash
cd /path/to/cocktail-recipe-app

# .env.production を編集してドメインを設定
echo "VITE_API_BASE_URL=https://api.YOUR_DOMAIN" > .env.production

# ビルド
npm run build

# S3 にアップロード
BUCKET=$(cd terraform && terraform output -raw frontend_bucket_name)

aws s3 sync dist/ s3://$BUCKET \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

aws s3 cp dist/index.html s3://$BUCKET/index.html \
  --cache-control "no-cache,no-store,must-revalidate"

# CloudFront キャッシュを無効化
CF_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $CF_ID --paths "/*"
```

---

## Step 8: GitHub Actions シークレット設定

```bash
# GitHub Actions 用のキーを取得
cd terraform
ACCESS_KEY_ID=$(terraform output -raw github_actions_access_key_id)
SECRET_ACCESS_KEY=$(terraform output -raw github_actions_secret_access_key)
FRONTEND_BUCKET=$(terraform output -raw frontend_bucket_name)
CF_ID=$(terraform output -raw cloudfront_distribution_id)

# GitHub シークレットに登録
gh secret set AWS_ACCESS_KEY_ID --body "$ACCESS_KEY_ID"
gh secret set AWS_SECRET_ACCESS_KEY --body "$SECRET_ACCESS_KEY"
gh secret set FRONTEND_BUCKET_NAME --body "$FRONTEND_BUCKET"
gh secret set CLOUDFRONT_DISTRIBUTION_ID --body "$CF_ID"
gh secret set VITE_API_BASE_URL --body "https://api.YOUR_DOMAIN"
```

---

## Step 9: 動作確認

1. `https://YOUR_DOMAIN` でフロントエンドが表示されること
2. ログイン・登録が動作すること
3. カクテル一覧が表示されること (シードデータ 110件)
4. カクテルの作成・編集・削除が動作すること

---

## Step 10: CloudWatch Billing Alarm 設定

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "cocktail-billing-alarm" \
  --alarm-description "月額 $40 を超えたらアラート" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 86400 \
  --threshold 40 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=Currency,Value=USD \
  --evaluation-periods 1 \
  --alarm-actions arn:aws:sns:us-east-1:ACCOUNT_ID:billing-alert \
  --region us-east-1
```

---

## インフラ削除 (停止時)

```bash
cd terraform
terraform destroy
```

> **注意**: `aws_lb` に `enable_deletion_protection = true` が設定されているため、
> destroy 前に手動で無効化するか、先に `terraform apply` で false に変更してください。

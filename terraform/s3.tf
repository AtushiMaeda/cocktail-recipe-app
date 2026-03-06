# ---- フロントエンド静的ファイル用 S3 ----
resource "aws_s3_bucket" "frontend" {
  bucket = "${local.name_prefix}-frontend-${data.aws_caller_identity.current.account_id}"
  tags   = merge(local.tags, { Name = "${local.name_prefix}-frontend" })
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront OAC (Origin Access Control) 経由のみアクセス許可
resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.frontend.arn
        }
      }
    }]
  })
}

# ---- Active Storage (画像アップロード) 用 S3 ----
resource "aws_s3_bucket" "active_storage" {
  bucket = "${local.name_prefix}-uploads-${data.aws_caller_identity.current.account_id}"
  tags   = merge(local.tags, { Name = "${local.name_prefix}-uploads" })
}

resource "aws_s3_bucket_public_access_block" "active_storage" {
  bucket                  = aws_s3_bucket.active_storage.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_cors_configuration" "active_storage" {
  bucket = aws_s3_bucket.active_storage.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["https://${var.domain_name}", "https://api.${var.domain_name}"]
    max_age_seconds = 3600
  }
}

data "aws_caller_identity" "current" {}

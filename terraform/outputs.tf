output "ecr_repository_url" {
  description = "ECR リポジトリ URL (Docker イメージのプッシュ先)"
  value       = aws_ecr_repository.api.repository_url
}

output "ecs_cluster_name" {
  description = "ECS クラスター名"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS サービス名"
  value       = aws_ecs_service.api.name
}

output "alb_dns_name" {
  description = "ALB の DNS 名"
  value       = aws_lb.api.dns_name
}

output "cloudfront_domain_name" {
  description = "CloudFront ディストリビューション ドメイン名"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront ディストリビューション ID (キャッシュ無効化に使用)"
  value       = aws_cloudfront_distribution.frontend.id
}

output "frontend_bucket_name" {
  description = "フロントエンド用 S3 バケット名"
  value       = aws_s3_bucket.frontend.bucket
}

output "active_storage_bucket_name" {
  description = "Active Storage 用 S3 バケット名"
  value       = aws_s3_bucket.active_storage.bucket
}

output "rds_endpoint" {
  description = "RDS エンドポイント"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "route53_zone_id" {
  description = "Route 53 ホストゾーン ID"
  value       = aws_route53_zone.main.zone_id
}

output "github_actions_access_key_id" {
  description = "GitHub Actions 用 IAM アクセスキー ID"
  value       = aws_iam_access_key.github_actions.id
}

output "github_actions_secret_access_key" {
  description = "GitHub Actions 用 IAM シークレットアクセスキー"
  value       = aws_iam_access_key.github_actions.secret
  sensitive   = true
}

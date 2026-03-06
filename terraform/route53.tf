# Route 53 はドメイン購入時に自動作成されるが、
# 既存ゾーンをインポートするか、ここで新規作成する。
# ドメイン購入済みの場合は data ソースで参照することを推奨。
resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = local.tags
}

# フロントエンド: cocktail-app.com → CloudFront
resource "aws_route53_record" "frontend" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

# API: api.cocktail-app.com → ALB
resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.api.dns_name
    zone_id                = aws_lb.api.zone_id
    evaluate_target_health = true
  }
}

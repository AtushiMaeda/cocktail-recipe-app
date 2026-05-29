require_relative "app"
require_relative "config/initializers/rack_attack"
require_relative "config/initializers/log_filter"

# CORS設定
# フロントエンドがAuthorizationヘッダーを読めるようにexposeが必要
allowed_origins =
  if ENV["ALLOWED_ORIGINS"].to_s != ""
    ENV["ALLOWED_ORIGINS"].split(",").map(&:strip)
  else
    ["http://localhost:5173", "http://localhost:5174"]
  end

use Rack::Cors do
  allow do
    origins(*allowed_origins)
    resource "*",
      headers:     :any,
      methods:     %i[get post put patch delete options head],
      expose:      ["Authorization"],
      credentials: false
  end
end

# レート制限（Rack::Cors の後に置くことで 429 にも CORS ヘッダーを付与できる）
use Rack::Attack

# セキュリティヘッダーを全レスポンスに付与する薄いミドルウェア
# CSRF系の rack-protection は使わない: Bearer トークン認証でセッション非使用のため
class SecurityHeaders
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = @app.call(env)

    # クリックジャッキング対策
    headers["X-Frame-Options"] ||= "SAMEORIGIN"
    # MIME スニッフィング防止
    headers["X-Content-Type-Options"] ||= "nosniff"
    # API は JSON のみ返すため厳格な CSP
    headers["Content-Security-Policy"] ||= "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
    # HTTPS 強制（本番のみ）
    rack_env = ENV["RACK_ENV"] || ENV["RAILS_ENV"] || "development"
    if rack_env == "production"
      headers["Strict-Transport-Security"] ||= "max-age=31536000; includeSubDomains"
    end

    [status, headers, body]
  end
end
use SecurityHeaders

# 各ルートをマウント
use AuthRoutes
use CocktailRoutes

run CocktailApp

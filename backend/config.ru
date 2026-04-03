require_relative "app"

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

# 各ルートをマウント
use AuthRoutes
use CocktailRoutes

run CocktailApp

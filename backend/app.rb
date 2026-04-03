require_relative "config/environment"

class CocktailApp < Sinatra::Base
  # ヘルスチェック
  get "/up" do
    content_type :json
    { status: "ok" }.to_json
  end

  # 404ハンドラー
  not_found do
    content_type :json
    { error: "Not found" }.to_json
  end

  # 500ハンドラー
  error do
    content_type :json
    { error: "Internal server error" }.to_json
  end
end

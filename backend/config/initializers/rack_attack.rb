require "rack/attack"
require "active_support/cache"

class Rack::Attack
  # キャッシュストアを設定（プロセス内メモリ）
  # NOTE: ECS 複数コンテナ構成では Redis に変更が必要
  #   Rack::Attack.cache.store = ActiveSupport::Cache::RedisCacheStore.new(url: ENV["REDIS_URL"])
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new


  # --- ログイン: IP単位 ---
  # 同一IPから20リクエスト/60秒を超えたらスロットル
  throttle("sign_in/ip", limit: 20, period: 60) do |req|
    req.ip if req.post? && req.path == "/api/v1/auth/sign_in"
  end

  # --- ログイン: メール単位 ---
  # 同一メール宛に5回/20分を超えたらスロットル（アカウント狙い撃ち対策）
  # NOTE: body を読んだ後は必ず rewind する（後続の Sinatra が空読みしないように）
  throttle("sign_in/email", limit: 5, period: 20 * 60) do |req|
    if req.post? && req.path == "/api/v1/auth/sign_in"
      body = req.body.read
      req.body.rewind
      begin
        email = JSON.parse(body).dig("user", "email")
        email&.downcase&.strip&.presence
      rescue JSON::ParserError
        nil
      end
    end
  end

  # --- サインアップ: IP単位（スパム登録対策） ---
  # 同一IPから10リクエスト/1時間を超えたらスロットル
  throttle("sign_up/ip", limit: 10, period: 60 * 60) do |req|
    req.ip if req.post? && req.path == "/api/v1/auth/sign_up"
  end

  # スロットル時のレスポンス（JSON + Retry-After）
  self.throttled_responder = lambda do |req|
    match_data = req.env["rack.attack.match_data"]
    retry_after = (match_data || {})[:period]
    [
      429,
      { "Content-Type" => "application/json", "Retry-After" => retry_after.to_s },
      [{ error: "Too many requests. Please try again later." }.to_json]
    ]
  end
end

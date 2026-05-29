module AuthHelper
  # RACK_ENV・RAILS_ENV どちらでも本番を検出する（terraform側の設定差異に対応）
  JWT_SECRET = begin
    env    = ENV["RACK_ENV"] || ENV["RAILS_ENV"] || "development"
    secret = ENV["JWT_SECRET"]
    if env == "production"
      if secret.nil? || secret.strip.empty?
        raise "JWT_SECRET environment variable must be set in production. " \
              "Generate with: ruby -rsecurerandom -e \"puts SecureRandom.hex(32)\""
      end
      if secret.bytesize < 32
        raise "JWT_SECRET must be at least 32 bytes (256 bits) for HS256. " \
              "Generate with: ruby -rsecurerandom -e \"puts SecureRandom.hex(32)\""
      end
      secret
    else
      (secret && !secret.strip.empty?) ? secret : "development-only-insecure-secret-do-not-use-in-prod"
    end
  end
  JWT_EXPIRY  = 24 * 60 * 60  # 1日（秒）

  # ユーザーからJWTトークンを生成する
  def encode_jwt(user)
    payload = {
      sub: user.id,
      jti: user.jti,
      exp: Time.now.to_i + JWT_EXPIRY
    }
    JWT.encode(payload, JWT_SECRET, "HS256")
  end

  # JWTトークンをデコードしてpayloadを返す（無効なら nil）
  def decode_jwt(token)
    payload, = JWT.decode(token, JWT_SECRET, true, { algorithm: "HS256" })
    payload
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end

  # Authorizationヘッダーからトークンを取得し、Userを返す
  # JTIが一致しない場合（サインアウト後）は nil を返す
  def current_user
    return @current_user if defined?(@current_user)

    token = request.env["HTTP_AUTHORIZATION"]&.sub(/\ABearer /, "")
    return @current_user = nil if token.nil?

    payload = decode_jwt(token)
    return @current_user = nil if payload.nil?

    user = User.find_by(id: payload["sub"])
    return @current_user = nil if user.nil?

    # JTIが一致しない = サインアウト済みのトークン
    @current_user = user.jti == payload["jti"] ? user : nil
  end

  # 認証が必要なエンドポイントで使う。未認証なら401を返す
  def authenticate_user!
    halt 401, { error: "Unauthorized" }.to_json unless current_user
  end
end

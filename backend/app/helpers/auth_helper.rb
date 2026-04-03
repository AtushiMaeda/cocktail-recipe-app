module AuthHelper
  JWT_SECRET = ENV.fetch("JWT_SECRET", "dev-secret-please-change-in-production")
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

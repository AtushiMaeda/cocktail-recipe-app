class AuthRoutes < Sinatra::Base
  helpers AuthHelper

  # レスポンスをJSONに設定
  before { content_type :json }

  # ユーザー登録
  # POST /api/v1/auth/sign_up
  post "/api/v1/auth/sign_up" do
    body_params = JSON.parse(request.body.read) rescue {}
    user_params = body_params["user"] || {}

    user = User.new(
      email:    user_params["email"],
      name:     user_params["name"],
      password: user_params["password"]
    )

    # パスワード確認チェック
    if user_params["password"] != user_params["password_confirmation"]
      halt 422, { errors: ["Password confirmation doesn't match"] }.to_json
    end

    if user.save
      status 201
      {
        user: {
          id:    user.id.to_s,
          email: user.email,
          name:  user.name
        }
      }.to_json
    else
      halt 422, { errors: user.errors.full_messages }.to_json
    end
  end

  # ログイン
  # POST /api/v1/auth/sign_in
  post "/api/v1/auth/sign_in" do
    body_params = JSON.parse(request.body.read) rescue {}
    user_params = body_params["user"] || {}

    user = User.find_by(email: user_params["email"]&.downcase)

    if user&.valid_password?(user_params["password"])
      token = encode_jwt(user)
      # フロントエンドはこのヘッダーからトークンを読み取る
      headers["Authorization"] = "Bearer #{token}"
      {
        user: {
          id:    user.id.to_s,
          email: user.email,
          name:  user.name
        }
      }.to_json
    else
      halt 401, { error: "Invalid Email or password." }.to_json
    end
  end

  # ログアウト
  # DELETE /api/v1/auth/sign_out
  delete "/api/v1/auth/sign_out" do
    if current_user
      current_user.invalidate_jwt!
      { message: "Logged out successfully" }.to_json
    else
      halt 401, { message: "No active session" }.to_json
    end
  end

  # 現在のユーザー情報
  # GET /api/v1/auth/me
  get "/api/v1/auth/me" do
    authenticate_user!
    {
      user: {
        id:    current_user.id.to_s,
        email: current_user.email,
        name:  current_user.name
      }
    }.to_json
  end
end

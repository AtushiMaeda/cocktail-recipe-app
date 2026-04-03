class CocktailRoutes < Sinatra::Base
  helpers AuthHelper
  helpers PaginationHelper

  before { content_type :json }

  # カクテル一覧
  # GET /api/v1/cocktails
  get "/api/v1/cocktails" do
    scope = Cocktail.all
    scope = scope.by_category(params[:category])
    scope = scope.by_alcohol_content(params[:alcoholContent])
    scope = scope.search_by_name(params[:search])
    scope = scope.order(created_at: :asc)

    result = paginate(scope, page: params[:page], per_page: params[:per_page] || 200)

    {
      cocktails: result[:records].map { |c| CocktailSerializer.new(c, current_user: current_user).as_json },
      meta: result[:meta]
    }.to_json
  end

  # ランダムなカクテル（/:id より先に定義する必要がある）
  # GET /api/v1/cocktails/random
  get "/api/v1/cocktails/random" do
    cocktail = Cocktail.order(Arel.sql("RANDOM()")).first
    halt 404, { error: "No cocktails found" }.to_json unless cocktail

    { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }.to_json
  end

  # カクテル詳細
  # GET /api/v1/cocktails/:id
  get "/api/v1/cocktails/:id" do
    cocktail = Cocktail.find_by(id: params[:id])
    halt 404, { error: "Cocktail not found" }.to_json unless cocktail

    { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }.to_json
  end

  # カクテル作成
  # POST /api/v1/cocktails
  post "/api/v1/cocktails" do
    authenticate_user!

    body_params    = JSON.parse(request.body.read) rescue {}
    cocktail_params = body_params["cocktail"] || {}

    cocktail = current_user.cocktails.build(permitted_cocktail_params(cocktail_params))
    cocktail.is_original = true

    if cocktail.save
      status 201
      { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }.to_json
    else
      halt 422, { errors: cocktail.errors.full_messages }.to_json
    end
  end

  # カクテル更新
  # PATCH /api/v1/cocktails/:id
  patch "/api/v1/cocktails/:id" do
    authenticate_user!
    cocktail = find_and_authorize_cocktail!(params[:id])

    body_params    = JSON.parse(request.body.read) rescue {}
    cocktail_params = body_params["cocktail"] || {}

    if cocktail.update(permitted_cocktail_params(cocktail_params))
      { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }.to_json
    else
      halt 422, { errors: cocktail.errors.full_messages }.to_json
    end
  end

  # カクテル削除
  # DELETE /api/v1/cocktails/:id
  delete "/api/v1/cocktails/:id" do
    authenticate_user!
    cocktail = find_and_authorize_cocktail!(params[:id])

    cocktail.destroy
    { message: "Cocktail deleted successfully" }.to_json
  end

  # 画像アップロード
  # POST /api/v1/cocktails/:id/upload_image
  post "/api/v1/cocktails/:id/upload_image" do
    authenticate_user!
    cocktail = find_and_authorize_cocktail!(params[:id])

    uploaded_file = params[:image]
    halt 422, { error: "No image provided" }.to_json unless uploaded_file

    cocktail.image_file = uploaded_file[:tempfile]
    if cocktail.save
      { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }.to_json
    else
      halt 422, { errors: cocktail.errors.full_messages }.to_json
    end
  end

  private

  # 指定IDのカクテルを取得し、所有者確認をする
  def find_and_authorize_cocktail!(id)
    cocktail = Cocktail.find_by(id: id)
    halt 404, { error: "Cocktail not found" }.to_json unless cocktail
    halt 403, { error: "Not authorized" }.to_json unless cocktail.user_id == current_user.id
    cocktail
  end

  # 許可するパラメータだけを取り出す
  def permitted_cocktail_params(raw)
    {
      "name"            => raw["name"],
      "name_en"         => raw["name_en"],
      "image_url"       => raw["image_url"],
      "description"     => raw["description"],
      "glass"           => raw["glass"],
      "category"        => raw["category"],
      "alcohol_content" => raw["alcohol_content"],
      "ingredients"     => raw["ingredients"],
      "instructions"    => raw["instructions"],
      "flavors"         => raw["flavors"]
    }.compact
  end
end

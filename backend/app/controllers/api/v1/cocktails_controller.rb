module Api
  module V1
    class CocktailsController < ApplicationController
      before_action :authenticate_user!, only: [:create, :update, :destroy, :upload_image]
      before_action :set_cocktail, only: [:show, :update, :destroy, :upload_image]
      before_action :authorize_cocktail!, only: [:update, :destroy, :upload_image]

      # GET /api/v1/cocktails
      def index
        cocktails = Cocktail.all
        cocktails = cocktails.by_category(params[:category])
        cocktails = cocktails.by_alcohol_content(params[:alcoholContent])
        cocktails = cocktails.search_by_name(params[:search])
        cocktails = cocktails.order(created_at: :asc)
        cocktails = cocktails.with_attached_image
        cocktails = cocktails.page(params[:page]).per(params[:per_page] || 200)

        render json: {
          cocktails: cocktails.map { |c| CocktailSerializer.new(c, current_user: current_user).as_json },
          meta: {
            currentPage: cocktails.current_page,
            totalPages: cocktails.total_pages,
            totalCount: cocktails.total_count
          }
        }
      end

      # GET /api/v1/cocktails/:id
      def show
        render json: { cocktail: CocktailSerializer.new(@cocktail, current_user: current_user).as_json }
      end

      # GET /api/v1/cocktails/random
      def random
        cocktail = Cocktail.order("RANDOM()").first
        render json: { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }
      end

      # POST /api/v1/cocktails
      def create
        cocktail = current_user.cocktails.build(cocktail_params)
        cocktail.is_original = true

        if cocktail.save
          render json: { cocktail: CocktailSerializer.new(cocktail, current_user: current_user).as_json }, status: :created
        else
          render json: { errors: cocktail.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH /api/v1/cocktails/:id
      def update
        if @cocktail.update(cocktail_params)
          render json: { cocktail: CocktailSerializer.new(@cocktail, current_user: current_user).as_json }
        else
          render json: { errors: @cocktail.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/cocktails/:id
      def destroy
        @cocktail.destroy
        render json: { message: "Cocktail deleted successfully" }
      end

      # POST /api/v1/cocktails/:id/upload_image
      def upload_image
        if params[:image].present?
          @cocktail.image.attach(params[:image])
          render json: { cocktail: CocktailSerializer.new(@cocktail, current_user: current_user).as_json }
        else
          render json: { error: "No image provided" }, status: :unprocessable_entity
        end
      end

      private

      def set_cocktail
        @cocktail = Cocktail.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Cocktail not found" }, status: :not_found
      end

      def authorize_cocktail!
        unless @cocktail.user_id == current_user.id
          render json: { error: "Not authorized" }, status: :forbidden
        end
      end

      def cocktail_params
        params.require(:cocktail).permit(
          :name, :name_en, :image_url, :description, :glass,
          :category, :alcohol_content,
          ingredients: [:name, :amount, :unit],
          instructions: [],
          flavors: []
        )
      end
    end
  end
end

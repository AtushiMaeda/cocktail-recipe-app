class CocktailSerializer
  def initialize(cocktail, current_user: nil)
    @cocktail = cocktail
    @current_user = current_user
  end

  def as_json
    {
      id: @cocktail.id.to_s,
      name: @cocktail.name,
      nameEn: @cocktail.name_en,
      image: image_url,
      description: @cocktail.description,
      ingredients: @cocktail.ingredients,
      instructions: @cocktail.instructions,
      glass: @cocktail.glass,
      category: @cocktail.category,
      alcoholContent: @cocktail.alcohol_content,
      flavor: @cocktail.flavors,
      isOriginal: @cocktail.is_original,
      userId: @cocktail.user_id&.to_s,
      canEdit: can_edit?
    }
  end

  private

  def image_url
    if @cocktail.image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(@cocktail.image, only_path: true)
    else
      @cocktail.image_url
    end
  end

  def can_edit?
    return false unless @current_user
    @cocktail.user_id == @current_user.id
  end
end

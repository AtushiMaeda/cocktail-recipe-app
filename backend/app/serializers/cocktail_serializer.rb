class CocktailSerializer
  def initialize(cocktail, current_user: nil)
    @cocktail     = cocktail
    @current_user = current_user
  end

  def as_json
    {
      id:            @cocktail.id.to_s,
      name:          @cocktail.name,
      nameEn:        @cocktail.name_en,
      image:         image_url,
      description:   @cocktail.description,
      ingredients:   @cocktail.ingredients,
      instructions:  @cocktail.instructions,
      glass:         @cocktail.glass,
      category:      @cocktail.category,
      alcoholContent: @cocktail.alcohol_content,
      flavor:        @cocktail.flavors,
      isOriginal:    @cocktail.is_original,
      userId:        @cocktail.user_id&.to_s,
      canEdit:       can_edit?
    }
  end

  private

  def image_url
    # Shrineで画像がアップロードされていればそのURLを返す
    if @cocktail.image_file.present?
      @cocktail.image_file_url
    else
      # シードデータ等のimage_urlカラムを使う
      @cocktail.image_url
    end
  end

  def can_edit?
    return false unless @current_user
    @cocktail.user_id == @current_user.id
  end
end

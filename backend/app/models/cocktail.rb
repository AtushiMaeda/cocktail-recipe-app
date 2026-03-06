class Cocktail < ApplicationRecord
  belongs_to :user, optional: true

  has_one_attached :image

  validates :name, presence: true
  validates :name_en, presence: true
  validates :description, presence: true
  validates :glass, presence: true
  validates :category, presence: true
  validates :alcohol_content, presence: true
  validates :ingredients, presence: true
  validates :instructions, presence: true, length: { minimum: 1 }
  validate :ingredients_format

  scope :by_category, ->(category) { where(category: category) if category.present? }
  scope :by_alcohol_content, ->(alcohol_content) { where(alcohol_content: alcohol_content) if alcohol_content.present? }
  scope :search_by_name, ->(query) { where("name ILIKE ? OR name_en ILIKE ?", "%#{query}%", "%#{query}%") if query.present? }

  private

  def ingredients_format
    return if ingredients.blank?
    unless ingredients.is_a?(Array)
      errors.add(:ingredients, "must be an array")
      return
    end
    ingredients.each do |ingredient|
      unless ingredient.is_a?(Hash) && ingredient.key?("name") && ingredient.key?("amount")
        errors.add(:ingredients, "each ingredient must have name and amount fields")
        break
      end
    end
  end
end

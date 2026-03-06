class CreateCocktails < ActiveRecord::Migration[8.1]
  def change
    create_table :cocktails do |t|
      t.references :user, null: true, foreign_key: true
      t.string :name, null: false
      t.string :name_en, null: false
      t.string :image_url
      t.text :description, null: false
      t.jsonb :ingredients, null: false, default: []
      t.text :instructions, null: false, array: true, default: []
      t.string :glass, null: false
      t.string :category, null: false
      t.string :alcohol_content, null: false
      t.text :flavors, null: false, array: true, default: []
      t.boolean :is_original, default: false

      t.timestamps
    end

    add_index :cocktails, :category
    add_index :cocktails, :alcohol_content
    add_index :cocktails, :name
    add_index :cocktails, :ingredients, using: :gin
  end
end

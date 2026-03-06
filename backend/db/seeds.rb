require "json"

puts "Seeding cocktails..."

cocktails_data = JSON.parse(File.read(File.join(__dir__, "seed_data/cocktails.json")))

cocktails_data.each do |data|
  Cocktail.find_or_create_by(name: data["name"], name_en: data["name_en"]) do |cocktail|
    cocktail.image_url = data["image_url"]
    cocktail.description = data["description"]
    cocktail.ingredients = data["ingredients"]
    cocktail.instructions = data["instructions"]
    cocktail.glass = data["glass"]
    cocktail.category = data["category"]
    cocktail.alcohol_content = data["alcohol_content"]
    cocktail.flavors = data["flavors"]
    cocktail.is_original = false
    cocktail.user = nil
  end
end

puts "Seeded #{Cocktail.count} cocktails"

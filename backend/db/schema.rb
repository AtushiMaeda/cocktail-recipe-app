# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_03_000000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cocktails", force: :cascade do |t|
    t.string "alcohol_content", null: false
    t.string "category", null: false
    t.datetime "created_at", null: false
    t.text "description", null: false
    t.text "flavors", default: [], null: false, array: true
    t.string "glass", null: false
    t.jsonb "image_file_data"
    t.string "image_url"
    t.jsonb "ingredients", default: [], null: false
    t.text "instructions", default: [], null: false, array: true
    t.boolean "is_original", default: false
    t.string "name", null: false
    t.string "name_en", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["alcohol_content"], name: "index_cocktails_on_alcohol_content"
    t.index ["category"], name: "index_cocktails_on_category"
    t.index ["ingredients"], name: "index_cocktails_on_ingredients", using: :gin
    t.index ["name"], name: "index_cocktails_on_name"
    t.index ["user_id"], name: "index_cocktails_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "jti", default: "", null: false
    t.string "name"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "cocktails", "users"
end

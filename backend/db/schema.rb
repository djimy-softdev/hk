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

ActiveRecord::Schema[7.1].define(version: 2024_01_20_160012) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "currency_code", ["NTD"]

  create_table "addresses", force: :cascade do |t|
    t.bigint "city_address_id", null: false
    t.string "road_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_address_id"], name: "index_addresses_on_city_address_id"
  end

  create_table "city_addresses", force: :cascade do |t|
    t.string "city", null: false
    t.string "district", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false

    t.unique_constraint ["city", "district"], deferrable: :immediate
  end

  create_table "currencies", force: :cascade do |t|
    t.string "name"
    t.enum "code", default: "NTD", null: false, enum_type: "currency_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_currencies_on_code", unique: true
  end

  create_table "favorite_properties", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "property_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id"], name: "index_favorite_properties_on_property_id"
    t.index ["user_id"], name: "index_favorite_properties_on_user_id"
    t.unique_constraint ["user_id", "property_id"], deferrable: :immediate
  end

  create_table "properties", force: :cascade do |t|
    t.string "title"
    t.string "thumbnail_url"
    t.integer "bedrooms"
    t.integer "rent_amount"
    t.bigint "currency_id", null: false, comment: "The currency of the rent amount"
    t.bigint "address_id", null: false
    t.string "mrt"
    t.jsonb "user_defined_fields"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_properties_on_address_id"
    t.index ["currency_id"], name: "index_properties_on_currency_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
    t.unique_constraint ["user_id", "role_id"], deferrable: :immediate
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "addresses", "city_addresses"
  add_foreign_key "favorite_properties", "properties"
  add_foreign_key "favorite_properties", "users"
  add_foreign_key "properties", "addresses"
  add_foreign_key "properties", "currencies"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
end

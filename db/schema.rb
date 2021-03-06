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

ActiveRecord::Schema.define(version: 2021_10_05_134945) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "hike_id", null: false
    t.bigint "user_id", null: false
    t.text "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hike_id"], name: "index_comments_on_hike_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "hike_lists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "hike_id", null: false
    t.boolean "completed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.index ["hike_id"], name: "index_hike_lists_on_hike_id"
    t.index ["user_id"], name: "index_hike_lists_on_user_id"
  end

  create_table "hike_photos", force: :cascade do |t|
    t.string "img_url"
    t.string "caption"
    t.bigint "hike_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hike_id"], name: "index_hike_photos_on_hike_id"
  end

  create_table "hikes", force: :cascade do |t|
    t.string "title"
    t.string "city"
    t.string "state"
    t.integer "length"
    t.integer "elevation"
    t.integer "difficulty"
    t.text "directions"
    t.boolean "pet_friendly"
    t.text "extra_info"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_hikes_on_user_id"
  end

  create_table "logs", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "weather"
    t.integer "distance"
    t.string "location"
    t.text "notes"
    t.date "date"
    t.string "trail_name"
    t.string "photo"
    t.integer "rating"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_logs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "comments", "hikes"
  add_foreign_key "comments", "users"
  add_foreign_key "hike_lists", "hikes"
  add_foreign_key "hike_lists", "users"
  add_foreign_key "hike_photos", "hikes"
  add_foreign_key "hikes", "users"
  add_foreign_key "logs", "users"
end

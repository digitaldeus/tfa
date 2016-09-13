# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160913151740) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.integer  "assetable_id"
    t.string   "assetable_type",    limit: 30
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "ckeditor_assets", ["assetable_type", "assetable_id"], name: "idx_ckeditor_assetable", using: :btree
  add_index "ckeditor_assets", ["assetable_type", "type", "assetable_id"], name: "idx_ckeditor_assetable_type", using: :btree

  create_table "customer_contacts", force: :cascade do |t|
    t.string   "purpose",    null: false
    t.string   "first_name", null: false
    t.string   "last_name",  null: false
    t.text     "details"
    t.string   "email",      null: false
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "establishments", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "website"
    t.string   "email"
    t.string   "admin_email"
    t.string   "phone"
    t.string   "admin_phone"
    t.string   "leader"
    t.string   "denomination"
    t.string   "pastor"
    t.string   "place_id"
  end

  create_table "images", force: :cascade do |t|
    t.string   "graphic"
    t.boolean  "processed"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.integer  "width"
    t.integer  "height"
  end

  add_index "images", ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.float    "latitude"
    t.float    "longitude"
    t.string   "address"
    t.integer  "establishment_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "place_id"
    t.string   "zip"
  end

  add_index "locations", ["establishment_id"], name: "index_locations_on_establishment_id", using: :btree

  create_table "service_times", force: :cascade do |t|
    t.string   "service_name"
    t.string   "start_time",       null: false
    t.integer  "establishment_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "day",              null: false
  end

  add_index "service_times", ["establishment_id"], name: "index_service_times_on_establishment_id", using: :btree

  create_table "social_links", force: :cascade do |t|
    t.string   "facebook"
    t.string   "twitter"
    t.string   "yelp"
    t.string   "google_plus"
    t.string   "youtube"
    t.string   "instagram"
    t.string   "linkedin"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "social_linkable_id"
    t.string   "social_linkable_type"
  end

  add_index "social_links", ["social_linkable_type", "social_linkable_id"], name: "social_linkable_index", using: :btree

  create_table "staffs", force: :cascade do |t|
    t.string   "name"
    t.string   "title"
    t.text     "description"
    t.integer  "establishment_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "staffs", ["establishment_id"], name: "index_staffs_on_establishment_id", using: :btree

  create_table "user_profiles", force: :cascade do |t|
    t.integer "user_id"
    t.string  "name"
    t.text    "description"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "service_times", "establishments"
end

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

ActiveRecord::Schema.define(version: 20140827050325) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "adventures", force: true do |t|
    t.integer  "user_id",                                null: false
    t.integer  "destination_id"
    t.string   "status",         default: "in-progress", null: false
    t.integer  "zipcode",                                null: false
    t.integer  "time_limit",                             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "adventures", ["destination_id"], name: "index_adventures_on_destination_id", using: :btree
  add_index "adventures", ["user_id"], name: "index_adventures_on_user_id", using: :btree

  create_table "destinations", force: true do |t|
    t.string   "name"
    t.integer  "rating"
    t.float    "lat"
    t.float    "long"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "interests", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.hstore   "interests"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end

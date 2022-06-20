class Sity < ActiveRecord::Migration[5.2]
  create_table :country do |t|
    t.string :name, null: false
    t.integer :country_id
  end
end

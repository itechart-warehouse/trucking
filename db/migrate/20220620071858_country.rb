class Country < ActiveRecord::Migration[5.2]
  create_table :country do |t|
    t.string :name, null: false
  end
end


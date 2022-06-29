class CreateCountries < ActiveRecord::Migration[5.2]
  def change
    create_table :countries do |t|
      t.string :name, null: false
    end

    add_index :countries, :name, unique: true
  end
end

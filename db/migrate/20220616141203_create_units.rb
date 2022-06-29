class CreateUnits < ActiveRecord::Migration[5.2]
  def change
    create_table :units do |t|
      t.string :name, null: false
      t.string :short_name
    end

    add_index :units, :name, unique: true
  end
end

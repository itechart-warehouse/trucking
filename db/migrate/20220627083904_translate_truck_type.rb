class TranslateTruckType < ActiveRecord::Migration[5.2]
  def up
    TruckType.create_translation_table! :truck_type_name => :string
  end

  def down
    TruckType.drop_translation_table!
  end
end

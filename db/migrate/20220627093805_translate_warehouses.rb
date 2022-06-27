class TranslateWarehouses < ActiveRecord::Migration[5.2]
  def up
    Warehouse.create_translation_table! :warehouse_name => :string
  end

  def down
    Warehouse.drop_translation_table!
  end
end

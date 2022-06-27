class TranslateWaybill < ActiveRecord::Migration[5.2]
  def up
    Waybill.create_translation_table! :status => :string
  end

  def down
    Waybill.drop_translation_table!
  end
end

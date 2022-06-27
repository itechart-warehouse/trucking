class TranslateWriteOffActs < ActiveRecord::Migration[5.2]
  def up
    WriteOffAct.create_translation_table! :good_name => :string, :description => :text
  end

  def down
    WriteOffAct.drop_translation_table!
  end
end

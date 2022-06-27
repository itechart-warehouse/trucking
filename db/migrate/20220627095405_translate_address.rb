class TranslateAddress < ActiveRecord::Migration[5.2]
  def up
    Address.create_translation_table! :town => :string, :street => :string
  end

  def down
    Address.drop_translation_table!
  end
end

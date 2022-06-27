class TranslateCompany < ActiveRecord::Migration[5.2]
  def up
    Company.create_translation_table! :name => :string
  end

  def down
    Company.drop_translation_table!
  end
end

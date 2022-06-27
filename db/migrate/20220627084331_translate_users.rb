class TranslateUsers < ActiveRecord::Migration[5.2]
  def up
    User.create_translation_table! :first_name => :string, :second_name => :string, :middle_name => :string
  end

  def down
    User.drop_translation_table!
  end
end

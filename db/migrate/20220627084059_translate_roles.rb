class TranslateRoles < ActiveRecord::Migration[5.2]
  def up
    Role.create_translation_table! :role_name => :string
  end

  def down
    Role.drop_translation_table!
  end
end

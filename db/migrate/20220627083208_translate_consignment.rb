class TranslateConsignment < ActiveRecord::Migration[5.2]

  def up
    Consignment.create_translation_table! :status => :string
  end

  def down
    Consignment.drop_translation_table!
  end

end

class TranslateGoods < ActiveRecord::Migration[5.2]

  def up
    Good.create_translation_table! :good_name => :string , :unit_of_measurement => :string, :status => :string
  end

  def down
    Good.drop_translation_table!
  end

end

class TranslateGoodsOwners < ActiveRecord::Migration[5.2]

  def up
    GoodsOwner.create_translation_table! :goods_owner_name => :string
  end

  def down
    GoodsOwner.drop_translation_table!
  end

end

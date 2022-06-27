class TranslateCheckpoit < ActiveRecord::Migration[5.2]

  def up
    Checkpoint.create_translation_table! :city => :string
  end

  def down
    Checkpoint.drop_translation_table!
  end

end

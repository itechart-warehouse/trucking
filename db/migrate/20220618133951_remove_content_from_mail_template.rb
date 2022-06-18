class RemoveContentFromMailTemplate < ActiveRecord::Migration[5.2]
  def change
    remove_column :mail_templates, :content, :text
  end
end

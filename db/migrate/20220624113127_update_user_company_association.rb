class UpdateUserCompanyAssociation < ActiveRecord::Migration[5.2]
  def change
    create_table :user_companies do |t|
      t.belongs_to :user
      t.belongs_to :company
      
      t.timestamps null: false
    end

    add_index :user_companies, %i[user_id company_id], unique: true
    remove_column :users, :company_id, :bigint
  end
end

class RemoveNullValidation < ActiveRecord::Migration[5.2]
  def change
    change_column_null :roles, :role_name, true
    change_column_null :truck_types, :truck_type_name, true
    change_column_null :goods_owners, :goods_owner_name, true
    change_column_null :warehouses, :warehouse_name, true
  end
end

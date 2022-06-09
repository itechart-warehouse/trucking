FactoryBot.define do
  factory :warehouse do
    sequence(:warehouse_name) { |i| "warehouse_name_#{i}" }
    association(:address)
    warehouseman { create(:user,role_id:7) }
  end
end

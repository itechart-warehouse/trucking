FactoryBot.define do
  factory :consignment do
    driver { create(:user,role_id:3) }
    dispatcher { create(:user,role_id:1) }
    manager { create(:user,role_id:4) }
    association(:truck)
    status { 'registered' }
    consignment_seria { 'CS' }
    sequence(:consignment_number) { |i| i.to_i + 1000}
    bundle_seria { 'BS' }
    sequence(:bundle_number) { |i| i.to_i + 1000 }
  end
end

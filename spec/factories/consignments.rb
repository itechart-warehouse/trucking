FactoryBot.define do
  factory :consignment do
    driver { create(:user,role_id:3) }
    dispatcher { create(:user,role_id:1) }
    manager { create(:user,role_id:4) }
    association(:truck)
    status { 'registered' }
    consignment_seria { 'CS' }
    sequence(:consignment_number) { |i| i.to_i}
    bundle_seria { 'BS_test' }
    sequence(:bundle_number) { |i| i.to_i }
  end
end

FactoryBot.define do
  factory :write_off_act do
    good_name {'Potato'}
    lost_quantity {1}
    association(:consignment)
  end
end

FactoryBot.define do
  factory :truck do
    fuel_consumption { 42.42 }
    sequence(:truck_number) { |i| "#{i}#{i}#{i}-test"}
    association(:truck_type)
    association(:company)
  end
end

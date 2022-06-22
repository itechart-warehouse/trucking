FactoryBot.define do
  factory :city do
    sequence(:name) { |i| "city_#{i}"}
    association(:country)
  end
end

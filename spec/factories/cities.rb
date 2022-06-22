FactoryBot.define do
  factory :city do
    sequence(:name) { |i| "city_#{i}"}
    country {create(:country)}
  end
end

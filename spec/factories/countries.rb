FactoryBot.define do
  factory :country do
    sequence(:name) { |i| "country_1-#{i}"}
  end
end

FactoryBot.define do
  factory :country do
    sequence(:name) { |i| "country_#{i}"}
  end
end

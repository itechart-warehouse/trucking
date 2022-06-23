FactoryBot.define do
  factory :city do
    name {Faker::Address.country}
    association(:country)
  end
end

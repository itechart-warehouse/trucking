FactoryBot.define do
  factory :unit do
    sequence(:name) { |i| "measure_unit_#{i}" }
    sequence(:short_name) { |i| "MU_#{i}" }
  end
end

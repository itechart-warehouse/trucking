# frozen_string_literal: true

FactoryBot.define do
  factory :truck_type do
    sequence(:truck_type_name) { |i| "truck_type_name_#{i}" }
  end
end

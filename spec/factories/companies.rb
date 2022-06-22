# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    sequence(:name) { |i| "first#{i}" }
    is_suspended { false }
  end
end

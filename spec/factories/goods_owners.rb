# frozen_string_literal: true

FactoryBot.define do
  factory :goods_owner do
    sequence(:goods_owner_name) { |i| "goods_owner_name_#{i}" }
    association(:address)
  end
end

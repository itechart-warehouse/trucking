# frozen_string_literal: true

FactoryBot.define do
  factory :good do
    good_name { 'Potato' }
    quantity { 12 }
    unit_of_measurement { 'item' }
    association(:consignment)
  end
end

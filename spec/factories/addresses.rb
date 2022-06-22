# frozen_string_literal: true

FactoryBot.define do
  factory :address do
    town { 'town' }
    street { 'wide' }
    building { 23 }
    apartment { 31 }
  end
end

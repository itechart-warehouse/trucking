# frozen_string_literal: true

FactoryBot.define do
  factory :checkpoint do
    city { 'gomel' }
    is_passed { false }
    pass_date { '01.01.2020' }
  end
end

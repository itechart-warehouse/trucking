# frozen_string_literal: true

FactoryBot.define do
  factory :waybill do
    waybill_seria { 'BS' }
    sequence(:waybill_number) { |i| "1#{i}1" }
    end_date { '11.11.2021' }
    start_date { '11.11.2021' }
    startpoint { create(:address) }
    endpoint { create(:address) }
    consignment { create(:consignment) }
    warehouse { create(:warehouse) }
    goods_owner { create(:goods_owner) }
  end
end

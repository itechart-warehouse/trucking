# frozen_string_literal: true

class WaybillSerializer < ActiveModel::Serializer
  attributes :id, :status, :waybill_number, :waybill_seria
  belongs_to :consignment
  belongs_to :endpoint, class_name: 'Address'
  belongs_to :startpoint, class_name: 'Address'
  has_many :checkpoints
end

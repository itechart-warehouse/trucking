# frozen_string_literal: true

class Waybill < ApplicationRecord
  has_many :routes
  belongs_to :consignment
  belongs_to :goods_owner
  belongs_to :endpoint, class_name: 'Address'
  belongs_to :startpoint, class_name: 'Address'
  validates :startpoint_id, presence: true
  validates :endpoint_id, presence: true
  validates :seria, presence: true
  validates :number, presence: true

  def start_point
    Address.find(startpoint)
  end

  def end_point
    Address.find(endpoint)
  end
end

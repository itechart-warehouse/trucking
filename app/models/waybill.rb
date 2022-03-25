# frozen_string_literal: true

class Waybill < ApplicationRecord
  has_many :routes
  belongs_to :consignment
  belongs_to :goods_owner

  def start_point
    Address.find(startpoint)
  end

  def end_point
    Address.find(endpoint)
  end
end
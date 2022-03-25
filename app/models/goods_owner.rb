# frozen_string_literal: true

class GoodsOwner < ApplicationRecord
  belongs_to :address
  has_many :waybill
  validates :goods_owner_name, presence: true, uniqueness: true, length: { in: 3..30 }
end
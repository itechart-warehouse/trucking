# frozen_string_literal: true

class Waybill < ApplicationRecord
  audited

  has_many :checkpoints, dependent: :restrict_with_exception
  belongs_to :consignment
  belongs_to :goods_owner
  belongs_to :warehouse
  belongs_to :endpoint, class_name: 'Address'
  belongs_to :startpoint, class_name: 'Address'
  validates :waybill_number, presence: true, numericality: { greater_than: 0 }
  validates :waybill_seria, presence: true, length: { in: 2..10 },
                            uniqueness: { scope: :waybill_number }

  scope :search, lambda { |search_data|
                   where(['waybill_seria LIKE ? and waybill_number::text  LIKE ?',
                          "%#{search_data.split[0]}%", "%#{search_data.split[1]}%"])
                 }
end

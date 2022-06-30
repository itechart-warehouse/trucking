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

  scope :by_seria_number, ->(search) {
                            seria, number = search.split
                            query = "waybill_seria ILIKE '#{seria}%'"
                            if number.present?
                              query += "and waybill_number::text  ILIKE '#{number}%'"
                            end
                            where(query)
                          }
end

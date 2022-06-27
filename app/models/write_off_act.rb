# frozen_string_literal: true

class WriteOffAct < ApplicationRecord
  audited

  belongs_to :consignment
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :lost_quantity, presence: true, numericality: { greater_than: 0 }
  validates :description, allow_blank: true, length: { in: 2..255 }
  validate :good_name_and_quantity
  before_create :update_lost_goods_status

  translates :good_name, :description

  scope :by_seria_number, ->(search) {
                            seria, number = search.split
                            query = "consignments.bundle_seria ILIKE '#{seria}%'"
                            query += "and consignments.bundle_number ILIKE '#{number}%'" if
                              number.present?
                            where(query)
                          }

  private

  def update_lost_goods_status
    lost_item = consignment.goods.where(good_name: good_name)
    lost_item.update(status: 'lost')
  end

  def good_name_and_quantity
    consignment_goods_names = consignment.goods.select(:good_name).collect(&:good_name)

    if consignment_goods_names.include?(good_name)
      item = consignment.goods.where(good_name: good_name).first

      errors.add(:quantity, 'of lost items is invalid') if lost_quantity > item.quantity
    else
      errors.add(:good_name, 'is not in bundle for this consignment')
    end
  end
end

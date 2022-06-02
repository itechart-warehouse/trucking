# frozen_string_literal: true

class WriteOffAct < ApplicationRecord
  audited

  belongs_to :consignment
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :lost_quantity, presence: true, numericality: { greater_than: 0 }
  validates :description, allow_blank: true, length: { in: 2..255 }
  validate :good_name_and_quantity
  before_create :update_lost_goods_status

  scope :search,->(search_data){ where(["Consignment.bundle_number LIKE ? and consignments.bundle_seria  LIKE ?",
                                        "%#{search_data.split[0]}%", "%#{search_data.split[1]}%"])}



  sql = "SELECT 'write_off_acts'.* FROM 'write_off_acts' WHERE 'consignments'.'bundle_seria' = #{search_data.split[0]} AND 'consignments'.'bundle_number' = #{search_data.split[1]}"
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

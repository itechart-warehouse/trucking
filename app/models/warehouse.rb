# frozen_string_literal: true

class Warehouse < ApplicationRecord
  audited

  belongs_to :address
  belongs_to :warehouseman, class_name: 'User'
  has_many :waybills, dependent: :restrict_with_exception
  validates :warehouse_name, presence: true, uniqueness: true, length: { in: 3..30 }

  scope :by_name, ->(search) { where("warehouse_name Ilike '#{search}%'") }
end

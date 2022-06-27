# frozen_string_literal: true

class Address < ApplicationRecord
  audited

  has_many :users, dependent: :nullify
  has_many :destinations, dependent: :nullify
  has_many :goods_owners, dependent: :nullify

  has_one :endpoint_waybill, dependent: :restrict_with_exception, class_name: 'Waybill',
                             foreign_key: 'endpoint'
  has_one :startpoint_waybill, dependent: :restrict_with_exception, class_name: 'Waybill',
                               foreign_key: 'startpoint'

  validates :town, presence: true, length: { in: 3..30 }
  validates :street, presence: true, length: { in: 3..30 }
  validates :building, presence: true, numericality: { greater_than: 0 }

  translates :town, :street
end

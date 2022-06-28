# frozen_string_literal: true

class TruckType < ApplicationRecord
  has_many :trucks, dependent: :destroy
  validates :truck_type_name, presence: true, length: { in: 3..30 }, uniqueness: true

end

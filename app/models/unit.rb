# frozen_string_literal: true

class Unit < ApplicationRecord
  audited

  validates :name, presence: true, uniqueness: true, length: { in: 2..20 }
  scope :by_name, ->(name) {
    query = "units.name ILIKE '#{name}'"
    where(query)
  }
end

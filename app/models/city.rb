class City < ApplicationRecord
  has_one :country
  validates :name, presence: true,uniqueness: true
end

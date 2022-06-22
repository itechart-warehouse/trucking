# frozen_string_literal: true

class Country < ApplicationRecord
  has_many :city
  validates :name, presence: true, uniqueness: true
end
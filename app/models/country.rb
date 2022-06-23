# frozen_string_literal: true

class Country < ApplicationRecord
  audited

  has_many :cities
  validates :name, presence: true, uniqueness: true
end

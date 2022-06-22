# frozen_string_literal: true

class Country < ApplicationRecord
  audited

  has_many :city
  validates :name, presence: true, uniqueness: true
end

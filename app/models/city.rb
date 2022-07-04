# frozen_string_literal: true

class City < ApplicationRecord
  audited

  belongs_to :country
  validates :name, presence: true, uniqueness: true
end

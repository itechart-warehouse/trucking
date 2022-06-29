# frozen_string_literal: true

class Country < ApplicationRecord
  audited

  has_many :cities , dependent: :destroy
  validates :name, presence: true, uniqueness: true

  scope :by_name, ->(search) { where("name ilike '#{search}%'") }
end

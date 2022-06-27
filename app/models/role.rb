# frozen_string_literal: true

class Role < ApplicationRecord
  has_many :users, dependent: :nullify
  validates :role_name, presence: true, length: { in: 3..30 }, uniqueness: true

  translates :role_name
end

# frozen_string_literal: true

class Good < ApplicationRecord
  audited

  belongs_to :consignment
  validates :good_name, presence: true, length: { in: 2..45 }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :unit_of_measurement, presence: true, length: { in: 2..15 }
  validates :status, presence: true, inclusion: { in: %w[accepted checked delivered lost] }

end

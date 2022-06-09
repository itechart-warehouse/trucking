# frozen_string_literal: true

class Checkpoint < ApplicationRecord
  audited

  validates :city, presence: true, length: { in: 3..15 }
  belongs_to :waybill
end

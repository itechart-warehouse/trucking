# frozen_string_literal: true

class UserCompany < ApplicationRecord
  belongs_to :user
  belongs_to :company
end

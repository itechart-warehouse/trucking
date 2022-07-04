# frozen_string_literal: true

require 'audited/audit'

class Statistics < Audited::Audit
  before_save :set_user_data
  belongs_to :company, optional: true

  def set_user_data
    user = ::Audited.store[:current_user]&.call
    if user
      self.user = user
      self.username = "#{user&.first_name} #{user&.second_name}"
      self.company = user&.company
    end
  end

  scope :alphabetical_sort, -> {
    order(username: :asc)
  }

  scope :search_name, ->(query) {
    where('username iLIKE :query', query: "%#{query}%")
  }

  scope :search_action, ->(actions) {
    where(action: actions)
  }

  scope :search_date, ->(start_date, end_date) {
    start_date = start_date.to_date.beginning_of_day
    end_date = end_date.to_date.end_of_day
    where('created_at between ? and ?', start_date, end_date)
  }
end

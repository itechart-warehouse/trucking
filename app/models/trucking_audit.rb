# frozen_string_literal: true

require 'audited/audit'

class TruckingAudit < Audited::Audit
  before_save :set_user_data

  def set_user_data
    user = ::Audited.store[:current_user]&.call
    if user
      self.user_id = user&.id
      self.username = "#{user&.first_name} #{user&.second_name}"
      self.company_id = user&.company_id
    end
  end
end

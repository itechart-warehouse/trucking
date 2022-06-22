# frozen_string_literal: true

class StatisticsSerializer < ActiveModel::Serializer
  attributes :id, :username, :company, :date, :action, :changes, :type

  def company
    object.company&.name
  end

  def date
    I18n.l(object.created_at, format: :default)
  end

  def changes
    object.audited_changes
  end

  def type
    object.auditable_type
  end
end

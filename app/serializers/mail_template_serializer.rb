# frozen_string_literal: true

class MailTemplateSerializer < ActiveModel::Serializer
  attributes :id, :name, :content
end

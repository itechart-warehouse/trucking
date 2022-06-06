class MailTemplateSerializer < ActiveModel::Serializer
    attributes :id, :name, :content
  end
# frozen_string_literal: true

class MailTemplate < ApplicationRecord
  has_rich_text :content

  scope :by_name, ->(search) { where("name ilike '#{search}%'") }
end

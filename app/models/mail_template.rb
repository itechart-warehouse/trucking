# frozen_string_literal: true

class MailTemplate < ApplicationRecord
  has_rich_text :content
end

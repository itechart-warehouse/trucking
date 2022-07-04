# frozen_string_literal: true

class BirthdayMailerPreview < ActionMailer::Preview
  def birthday_email
    BirthdayMailer.with(user: 'Nikita').birthday_email
  end
end

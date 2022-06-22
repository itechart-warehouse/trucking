# frozen_string_literal: true

class DeviseMailer < Devise::Mailer
  def confirmation_instructions(record, token, opts = {})
    @token = token
    @reset_password_token = set_reset_password_token(record)
    devise_mail(record, :confirmation_instructions, opts)
  end

  private

  def set_reset_password_token(record)
    raw, enc = Devise.token_generator.generate(record.class, :reset_password_token)

    record.reset_password_token   = enc
    record.reset_password_sent_at = Time.now.utc
    record.save(validate: false)
    raw
  end
end

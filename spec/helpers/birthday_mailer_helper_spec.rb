require 'rails_helper'

class BirthdayMailerTest < ActionMailer::TestCase
  test "birthday" do
    email = BirthdayMailer.birthday_email("friend@example.com", "Ivan Ivanovich Ivanov")

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ["trucking.app.reset@gmail.com"], email.from
    assert_equal ["friend@example.com"], email.to
    assert_equal "You have birthday email from trucking.app.reset@gmail.com", email.subject
    assert_equal read_fixture("birthday").join, email.body.to_s
  end
end

require "rails_helper"

class BirthdayMailerJobTest < ActiveJob::TestCase
  test "that user is get email" do
    BirthdayMailerJob.perform_now
  end
end

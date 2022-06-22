# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Consignment, type: :model do
  subject { create(:consignment) }

  context 'When credentials are not correct' do
    it 'subject should not be valid (invalid driver)' do
      subject.driver = create(:user)
      expect(subject).to_not be_valid
    end

    it 'subject should not be valid (invalid dispatcher)' do
      subject.dispatcher = create(:user)
      expect(subject).to_not be_valid
    end

    it 'subject should not be valid (invalid manager)' do
      subject.manager = create(:user)
      expect(subject).to_not be_valid
    end

    it 'consignment number should not be valid (blank)' do
      subject.consignment_number = ''
      expect(subject).to_not be_valid
    end

    it 'consignment number should not be valid (<0)' do
      subject.consignment_number = -10
      expect(subject).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'consignment should be valid' do
      expect(subject).to be_valid
    end
  end
end

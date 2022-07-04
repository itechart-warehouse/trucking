# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { create(:user) }

  context 'When first name credentials are not correct' do
    it 'first name length should not be valid (<3)' do
      subject.first_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'first name length should not be valid (>30)' do
      subject.first_name = 'fo' * 16
      expect(subject).to_not be_valid
    end

    it 'first name length should not be valid (blank)' do
      subject.first_name = ' ' * 5
      expect(subject).to_not be_valid
    end

    it 'second name length should not be valid (<3)' do
      subject.second_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'second name length should not be valid (>30)' do
      subject.second_name = 'fo' * 16
      expect(subject).to_not be_valid
    end

    it 'second name length should not be valid (blank)' do
      subject.second_name = ' ' * 5
      expect(subject).to_not be_valid
    end

    it 'middle name length should not be valid (<3)' do
      subject.middle_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'middle name length should not be valid (>30)' do
      subject.middle_name = 'fo' * 16
      expect(subject).to_not be_valid
    end

    it 'middle name length should not be valid (blank)' do
      subject.middle_name = ' ' * 5
      expect(subject).to_not be_valid
    end

    it 'login length should not be valid (<3)' do
      subject.login = 'fo'
      expect(subject).to_not be_valid
    end

    it 'login length should not be valid (>30)' do
      subject.login = 'fo' * 16
      expect(subject).to_not be_valid
    end

    it 'login length should not be valid (blank)' do
      subject.login = ' ' * 5
      expect(subject).to_not be_valid
    end

    it 'login should not be valid (not unique)' do
      user = build(:user, login: subject.login)
      expect(user).to_not be_valid
    end

    it 'birthday should not be valid (incorrect format)' do
      user = build(:user, birthday: '101/10/2020')
      expect(user).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'user should be valid' do
      expect(subject).to be_valid
    end
  end
end

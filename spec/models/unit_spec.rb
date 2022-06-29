require 'rails_helper'

RSpec.describe Unit, type: :model do
  subject { create(:unit) }

  context 'When credentials are not correct' do
    it 'name should not be valid (blank)' do
      subject.name = ''
      expect(subject).to_not be_valid
    end

    it 'name should not be valid (length < 2)' do
      subject.name = 'F'
      expect(subject).to_not be_valid
    end

    it 'name should not be valid (length > 20)' do
      subject.name = 'F' * 21
      expect(subject).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'measurement unit should be valid' do
      expect(subject).to be_valid
    end
  end
end

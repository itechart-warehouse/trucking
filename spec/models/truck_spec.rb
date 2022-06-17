# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Truck, type: :model do
  subject { create(:truck) }

  context 'When credentials are not correct' do
    it 'fuel consumption should not be valid (blank)' do
      subject.fuel_consumption = ''
      expect(subject).to_not be_valid
    end

    it 'fuel consumption should not be valid (<0)' do
      subject.fuel_consumption = -42.42
      expect(subject).to_not be_valid
    end

    it 'truck number should not be valid (blank)' do
      subject.truck_number = ''
      expect(subject).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'truck should be valid' do
      expect(subject).to be_valid
    end
  end
end

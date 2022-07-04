# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TruckType, type: :model do
  subject { create(:truck_type) }

  context 'When credentials are not correct' do
    it 'truck type name should not be valid (blank)' do
      subject.truck_type_name = ''
      expect(subject).to_not be_valid
    end

    it 'truck type name length should not be valid (<3)' do
      subject.truck_type_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'truck type name length should not be valid (>30)' do
      subject.truck_type_name = 'foobar' * 6
      expect(subject).to_not be_valid
    end

    it 'truck type name should not be valid (not unique)' do
      truck_type = build(:truck_type, truck_type_name: subject.truck_type_name)
      expect(truck_type).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'truck type should be valid' do
      expect(subject).to be_valid
    end
  end
end

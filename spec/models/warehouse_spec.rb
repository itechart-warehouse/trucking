# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Warehouse, type: :model do
  subject { create(:warehouse) }

  context 'When credentials are not correct' do
    it 'warehouse name should not be valid (blank)' do
      subject.warehouse_name = ''
      expect(subject).to_not be_valid
    end

    it 'warehouse name length should not be valid (<3)' do
      subject.warehouse_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'warehouse name length should not be valid (>30)' do
      subject.warehouse_name = 'foobar' * 6
      expect(subject).to_not be_valid
    end

    it 'warehouse name should not be valid (not unique)' do
      warehouse = build(:warehouse, warehouse_name: subject.warehouse_name,
                                    warehouseman: subject.warehouseman)
      expect(warehouse).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'warehouse should be valid' do
      expect(subject).to be_valid
    end
  end
end

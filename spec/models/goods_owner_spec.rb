# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GoodsOwner, type: :model do
  subject { create(:goods_owner) }

  context 'When credentials are not correct' do
    it 'warehouse name should not be valid (blank)' do
      subject.goods_owner_name = ''
      expect(subject).to_not be_valid
    end

    it 'warehouse name length should not be valid (<3)' do
      subject.goods_owner_name = 'fo'
      expect(subject).to_not be_valid
    end

    it 'warehouse namelength should not be valid (>30)' do
      subject.goods_owner_name = 'foobar' * 6
      expect(subject).to_not be_valid
    end

    it 'warehouse name should not be valid (not unique)' do
      goods_owner = build(:goods_owner, goods_owner_name: subject.goods_owner_name)
      expect(goods_owner).to_not be_valid
    end
  end

  context 'When credentials are correct' do
    it 'goods owner should be valid' do
      expect(subject).to be_valid
    end
  end
end

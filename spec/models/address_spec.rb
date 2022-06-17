# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Address, type: :model do
  it 'should create Address' do
    subject = build(:address)
    expect(subject.save).to eq(true)
  end
  it 'shouldn\'t create Address with town name less than 3 chars' do
    subject = build(:address)
    subject.town = 'te'
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Address with street name more than 30 chars' do
    subject = build(:address)
    subject.street = 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Address with building new_user less than 0' do
    subject = build(:address)
    subject.building = -9
    expect(subject.save).to eq(false)
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Good, type: :model do
  let(:subject) { build(:good) }
  it 'should create Good' do
    expect(subject.save).to eq(true)
  end
  it 'shouldn\'t create Good with good_name less than 2 chars' do
    subject.good_name = 't'
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Good with unit_of_measurement more than 15 chars' do
    subject.unit_of_measurement = 't' * 20
    expect(subject.save).to eq(false)
  end
  it 'shouldn\'t create Good with quantity less than 0' do
    subject.quantity = -9
    expect(subject.save).to eq(false)
  end
end

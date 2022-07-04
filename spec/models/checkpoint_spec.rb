# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Checkpoint, type: :model do
  subject { create(:route) }

  # TODO: uncomment specs below after:
  # 1. Creating Waybill factory
  # 2. Adding association between waybill and route

  # context 'invalid data to routes' do
  #   it 'route name should not be blank' do
  #     subject.city = ''
  #     expect(subject).to_not be_valid
  #   end
  # end
  # context 'valid data to routes' do
  #   it 'route should be valid' do
  #     expect(subject).to be_valid
  #   end
  # end
end

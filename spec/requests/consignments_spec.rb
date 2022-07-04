# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'consignments', type: :request do
  let(:user) { create(:user, role_id: 6) }

  before do
    sign_in user
  end

  describe 'GET consignments' do
    it 'get consignments' do
      FactoryBot.create_list(:consignment, 5)
      get '/consignments?page=0&per_page=5'
      expect(JSON.parse(JSON.parse(response.body)['consignments']).count).to eq(5)
    end
    it 'search' do
      consignment = create(:consignment)
      get "/consignments?page=0&search=#{consignment.consignment_seria} #{consignment.consignment_number}"
      expect(JSON.parse(JSON.parse(response.body)['consignments'])[0]['id']).to eq(consignment.id)
    end
  end
end

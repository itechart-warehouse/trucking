require 'rails_helper'

RSpec.describe 'consignments', type: :request do
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET consignments' do
    it 'get consignments' do
      FactoryBot.create_list(:consignment,5)
      get '/consignments?page=0&per_page=5'
      expect(JSON.parse(response.body).count).to eq(5)
    end
  end
end

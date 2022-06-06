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
RSpec.describe 'Consignments', type: :request do
  let(:user) { create(:user_sysAdmin) }
  let(:consignment) { create(:consignment) }
  before do
    sign_in user
  end
  describe 'get' do
    it 'search' do
      get "/consignments?search_data=#{consignment.consignment_seria} #{consignment.consignment_number}"
      expect(JSON.parse(response.body)[0]['id']).to eq(consignment.id)
    end
  end
end

require 'rails_helper'

RSpec.describe 'warehouses', type: :request do
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get users' do
      FactoryBot.create_list(:warehouse, 5 )
      get '/warehouses?page=0&per_page=5'
      expect(JSON.parse(response.body).count).to eq(5)
RSpec.describe 'Warehouses', type: :request do
  let(:user) { create(:user_sysAdmin) }
  let(:warehouse) { create(:warehouse) }
  before do
    sign_in user
  end
  describe 'get' do
    it 'search' do
      get "/warehouses?search_data=#{warehouse.warehouse_name}"
      expect(JSON.parse(response.body)[0]['id']).to eq(warehouse.id)
    end
  end
end

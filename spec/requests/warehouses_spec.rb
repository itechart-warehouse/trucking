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
      expect(JSON.parse(JSON.parse(response.body)['warehouses']).count).to eq(5)
      end
      it 'search' do
        warehouse = create(:warehouse)
        get "/warehouses?page=0&search=#{warehouse.warehouse_name}"
        expect(JSON.parse(JSON.parse(response.body)['warehouses'])[0]["id"]).to eq(warehouse.id)
      end
  end
  end


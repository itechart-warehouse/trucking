require 'rails_helper'

RSpec.describe 'warehouse trucks', type: :request do
  describe 'GET methods' do
    it 'get trucks' do
      FactoryBot.create_list(:truck,5)
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get '/api/v1/trucks?page=0&per_page=5',:params => { }, :headers => headers
      trucks=JSON.parse(response.body)
      expect(JSON.parse(trucks["trucks"]).count).to eq(5)
    end
    it 'search' do
      truck = create(:truck)
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get "/api/v1/trucks?search=#{truck.truck_number}", :headers => headers
      expect(JSON.parse(response.body)[0]['id']).to eq(truck.id)
    end
  end
end

require 'rails_helper'

RSpec.describe 'warehouse consignments', type: :request do
  describe 'GET methods' do
    it 'get consignments' do
      FactoryBot.create_list(:consignment,5)
      headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
      get '/api/v1/consignments?page=0&per_page=5',:params => { }, :headers => headers
      consignments=JSON.parse(response.body)
      expect(JSON.parse(consignments["consignments"]).count).to eq(5)
    end
  end
end

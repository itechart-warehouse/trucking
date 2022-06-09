require 'rails_helper'

RSpec.describe 'warehouse drivers', type: :request do
  describe 'GET methods' do
      it 'get drivers' do
        FactoryBot.create_list(:user,5,role_id:3)
        headers= { 'authorization'=> 'Basic c2hvcHBpbmdjZW50ZXJvd25lckBleGFtcGxlLmNvbTpzaG9wcGluZ2NlbnRlcm93bmVyMTIz' }
        get '/api/v1/drivers?page=0&per_page=5',:params => { }, :headers => headers
        drivers=JSON.parse(response.body)
        expect(JSON.parse(drivers["drivers"]).count).to eq(5)
    end
  end
end

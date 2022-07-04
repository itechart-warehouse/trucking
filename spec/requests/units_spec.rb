require 'rails_helper'

RSpec.describe 'Measurement units', type: :request do
  let(:sysAdmin) { create(:user_sysAdmin) }

  before do
    sign_in sysAdmin
  end

  describe 'GET methods' do
    it 'get measurement units' do
      measure_units = create_list(:unit, 5)
      get '/settings/units?page=0&per_page=5'
      expect(JSON.parse(response.body)).to eq(measure_units.as_json)
    end
  end

  describe 'positive POST/PATCH/DELETE methods' do
    it 'POST settings/units' do
      post '/settings/units', params: { name: 'uniqueUnit', short_name: 'UU' }
      expect(response).to have_http_status(:success)
    end

    it 'PATCH settings/units' do
      measure_unit = create(:unit)
      patch "/settings/units/#{measure_unit.id}",
            params: { name: 'uniqueUnit', short_name: 'UU' }
      expect(JSON.parse(response.body)).to eq(Unit.find(measure_unit.id).as_json)
    end

    it 'DELETE settings/units' do
      measure_unit = create(:unit)
      delete "/settings/units/#{measure_unit.id}"
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'negative POST/PATCH methods' do
    it 'POST settings/units' do
      post '/settings/units', params: { name: 'U', short_name: 'U' }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'PATCH settings/units' do
      measure_unit = create(:unit)
      patch "/settings/units/#{measure_unit.id}",
            params: { name: 'U', short_name: 'U' }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end

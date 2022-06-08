require 'rails_helper'

RSpec.describe 'Companies', type: :request do
  let(:company) { create(:company) }
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
      it 'get Companies' do
        FactoryBot.create_list(:company,5)
        get '/companies?page=0&per_page=5'
        expect(JSON.parse(response.body).count).to eq(5)
      end
      it 'search' do
        get "/companies?search=#{company.name}"
        expect(JSON.parse(response.body)[0]['id']).to eq(company.id)
      end
  end
end

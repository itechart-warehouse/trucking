require 'rails_helper'

RSpec.describe 'Companies', type: :request do
  let(:company) { create(:company) }
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get users' do
      get '/companies'
      expect(response).to have_http_status(:success)
    end
    it 'GET first page with 10 companies per page' do
      sign_in User.find(1)
      get '/companies/0/10'
      expect(JSON.parse(response.body).length).to eq(3)
    end
    it 'invalid delete request' do
      expect { delete "/companies/#{company.id + 1}" }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
  describe 'status /companies' do
    it 'valid status request' do
      patch "/companies/suspend/#{company.id}"
      expect(response).to have_http_status(204)
    end
    it 'valid status action' do
      patch "/companies/suspend/#{company.id}"
      expect(Company.find(company.id).is_suspended).to eq(true)
    end
    it 'invalid status request' do
      expect do
        patch "/companies/suspend/#{company.id + 1}"
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
  describe 'CREATE /companies' do
    it 'creates company' do
      companyName = 'Gonna give you up'
      post '/companies/create', params: { name: companyName }
      expect(Company.find_by(name: companyName).name).to eq(companyName)
    end
  end
end

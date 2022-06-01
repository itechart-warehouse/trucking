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
  end

    describe 'delete methods' do
      it 'valid delete request' do
        delete "/companies/#{company.id}"
        expect(response).to have_http_status(204)
      end
      it 'valid delete action' do
        company_count = Company.all.count
        delete "/companies/#{company.id}"
        expect(Company.all.count).to eq(company_count)
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
  describe 'get' do
    it 'search' do
      get "/companies?search_data=#{company.name}"
      print(user.role.role_name)
      expect(JSON.parse(response.body)).to eq(company)
    end
  end

end

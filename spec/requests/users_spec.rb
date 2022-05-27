require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let(:user) { create(:user,role_id:6) }

  before do
    sign_in user
  end

  describe 'GET methods' do
    it 'get users' do
      get '/users'
      expect(response).to have_http_status(:success)
    end
    it 'GET first page with 10 users per page' do
      sign_in User.find(1)
      get '/users/0/10'
      expect(JSON.parse(response.body).length).to eq(10)
    end
    it 'GET first page with 1 users => company without any users' do
      get '/users/0/10'
      expect(JSON.parse(response.body).length).to eq(1)
    end
  end

  describe 'positive POST/PUT/DELETE methods' do
    it 'POST users/create' do
      post '/users/create',
           params: { user: { first_name: 'Jhon', second_name: 'Doe', middle_name: 'Doevich',
                             birthday: '01/01/2000', passport: '13746423', login: 'Jhondoe', email: 'JhonDoe@test.com',
                             password: 'password', password_confirmation: 'password', role: 'dispatcher',
                             town: 'London', street: 'Baker', building: 2, apartment: 21, company: 'jetlogistic' } }
      expect(response).to have_http_status(:success)
    end
  end

  describe 'negative POST/PUT/DELETE methods' do
    it 'POST users/create' do
      user_count = User.all.count
      post '/users/create',
           params: { user: { first_name: 'as', second_name: 'Doe', middle_name: 'Doevich',
                             birthday: '01/01/2000', passport: '---------', login: 'Jhondoe', email: 'JhonDoe@test.com',
                             password: 'password', password_confirmation: 'password', role: 'dispatcher',
                             town: 'London', street: 'Baker', building: 2, apartment: 21, company: 'gruzivmse' } }
      expect(User.all.count).to eq(user_count)
    end
  end
end

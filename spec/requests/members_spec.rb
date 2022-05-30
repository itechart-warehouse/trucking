require 'rails_helper'

RSpec.describe "Members", type: :request do
  let(:user) { create(:user_sysAdmin) }

  before do
    sign_in user
  end

  describe 'GET methods' do
    it 'get users' do
      get '/users'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'positive POST/PUT/DELETE methods' do
    it 'POST users/create' do
      post '/users/create',
           params: { user: { first_name: 'Jhon', second_name: 'Doe', middle_name: 'Doevich',
                             birthday: '01-01-2000', passport: 'TEST13746423', login: 'Jhondoe', email: 'JhonDoe@test.com',
                             password: 'Password@1', password_confirmation: 'Password@1', role: 'dispatcher',
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

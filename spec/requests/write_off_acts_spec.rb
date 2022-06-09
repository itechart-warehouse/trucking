require 'rails_helper'

RSpec.describe 'Write_off_acts', type: :request do
  let(:user) { create(:user,role_id: 6) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get Write_off_acts' do
      consignment=create(:consignment)
      create(:good,consignment:consignment )
      FactoryBot.create_list(:write_off_act, 5 ,consignment: consignment)
      get '/write_off_acts?page=0&per_page=5'

      expect(JSON.parse(response.body).count).to eq(5)
    end
  end
end

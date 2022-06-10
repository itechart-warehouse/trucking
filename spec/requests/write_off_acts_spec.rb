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
      expect(JSON.parse(JSON.parse(response.body)['write_off_acts']).count).to eq(5)
    end
    it 'search' do
      consignment=create(:consignment)
      create(:good,consignment:consignment )
      write_off_act = create(:write_off_act, consignment: consignment)
      get "/write_off_acts?page=0&search=#{write_off_act.consignment.bundle_seria} #{write_off_act.consignment.bundle_number}"
      expect(JSON.parse(JSON.parse(response.body)['write_off_acts'])[0]["id"]).to eq(write_off_act.id)
    end
  end
end

require 'rails_helper'

RSpec.describe 'Write_off_acts', type: :request do
  let(:user) { create(:user_sysAdmin) }

  before do
    sign_in user
  end
  describe 'GET methods' do
    it 'get Write_off_acts' do
      consignment=create(:consignment)
      create(:good,consignment:consignment )
      write_off_act=create(:write_off_act,consignment:consignment)
      get "/write_off_acts?search_data=#{write_off_act.consignment.bundle_seria} #{write_off_act.consignment.bundle_number}"
      expect(JSON.parse(response.body)[0]['id']).to eq(write_off_act.id)
    end
  end
end

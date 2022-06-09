require 'rails_helper'

RSpec.describe 'Waybills', type: :request do
  let(:user) { create(:user,role_id: 6) }
  let(:consignment) { create(:consignment) }
  let(:warehouse) { create(:warehouse) }
  let(:goods_owner) { create(:goods_owner) }
  let(:waybill) {create(:waybill)}
  before do
    sign_in user
  end

  describe 'positive GET/POST/PUT/DELETE methods' do
    it 'get users' do
      FactoryBot.create_list(:waybill, 5 )
      get '/waybills?page=0&per_page=5'
      expect(JSON.parse(response.body).count).to eq(5)
    end
    it 'POST waybill/create' do
      waybills_count=Waybill.count
      post '/waybills',
           params: { waybill: { end_date: '10.10.2021', start_date: '10.10.2021', town: 'asd',
                                street: 'asd', building: '12',
                                end_town: 'asd', end_street: 'asd', end_building: '12',
                                goods_owner: goods_owner.goods_owner_name, waybill_number: '122',
                                waybill_seria: 'sda',
                                warehouse: warehouse.warehouse_name }, consignment_id: consignment.id }
      expect(Waybill.count).to eq(waybills_count+1)
    end
    it 'PUT waybill/update' do
      put "/waybills/#{waybill.id}"
      expect(Waybill.find(waybill.id).status).to eq("delivered to the recipient")
    end
  end
  describe 'Negative POST/PUT/DELETE methods' do
    it 'negative create waybill ' do
      waybills_count=Waybill.count
      post '/waybills',
           params: { waybill: { end_date: 'invalid date', start_date: 'invalid date', town: 'asd',
                                street: 'asd', building: '12', end_building: '12',
                                goods_owner: goods_owner.goods_owner_name, waybill_number: '122',
                                waybill_seria: 'sda',
                                warehouse: warehouse.warehouse_name }, consignment_id: consignment.id }
      expect(Waybill.count).to eq(waybills_count)
    end
  end
end

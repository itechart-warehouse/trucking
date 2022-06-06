# frozen_string_literal: true

class WaybillsController < ApplicationController
  def index
    waybills,meta = paginate_collection(company_waybills)
    @waybill_count = meta[:total_count]
    @serialized_waybills = ActiveModelSerializers::SerializableResource.new(waybills).to_json
    render json: waybills if params[:page]
    @serialized_waybills = ActiveModelSerializers::SerializableResource.new(@waybills).to_json
    render json: @waybills.search(params[:search_data])  if params[:search_data]
  end

  def create
    points = points_params

    ActiveRecord::Base.transaction do
      startpoint = Address.create!(points[:startpoint])
      endpoint = Address.create!(points[:endpoint])
      @waybill = Waybill.create!(create_waybill_params(startpoint, endpoint))
      if points[:checkpoints].present?
        points[:checkpoints].each do |city_name|
          Checkpoint.create!(city: city_name, waybill: @waybill)
        end
      end
    end

    render json: @waybill
  end

  def update
    authorize! :update, Waybill

    waybill = Waybill.find(params.permit(:id)[:id])
    waybill.update!(status: 'delivered to the recipient')

    render json: waybill
  end

  private

  def company_waybills
    return Waybill.all if current_user.role.role_name == 'system administrator'

    company_dispatchers = User.where(role: Role.find_by(role_name: 'dispatcher'),
                                     company: current_user.company)
    company_consignments = Consignment.where(dispatcher: company_dispatchers)
    Waybill.where(consignment: company_consignments)
  end

  def waybill_params
    parameters = params.require(:waybill).permit(:start_date, :end_date, :town, :street, :building,
                                                 :end_town, :end_street, :end_building,
                                                 :goods_owner, :waybill_number, :waybill_seria,
                                                 :warehouse)
    parameters[:consignment] = params.permit(:consignment_id)[:consignment_id]
    parameters[:checkpoints] = params.permit(checkpoints: [])[:checkpoints]
    parameters
  end

  def points_params
    data = waybill_params
    { startpoint: { town: data[:town], street: data[:street], building: data[:building] },
      endpoint: { town: data[:end_town], street: data[:end_street],
                  building: data[:end_building] },
      checkpoints: data[:checkpoints] }
  end

  def create_waybill_params(startpoint, endpoint)
    data = waybill_params
    { start_date: data[:start_date], end_date: data[:end_date],
      startpoint: startpoint, endpoint: endpoint,
      waybill_number: data[:waybill_number],
      waybill_seria: data[:waybill_seria],
      goods_owner: GoodsOwner.find_by(goods_owner_name: data[:goods_owner]),
      consignment: Consignment.find(data[:consignment]),
      warehouse: Warehouse.find_by(warehouse_name: data[:warehouse]) }
  end
end

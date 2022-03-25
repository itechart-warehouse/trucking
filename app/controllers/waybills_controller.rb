# frozen_string_literal: true

class WaybillsController < ApplicationController
  def index
    # waybills=[]
    @data = []
    # current_user.driver_consignments.each{|ttn| waybills.append(ttn.find_waybill)}
    Waybill.all.each do |waybill|
      @data.append({ id: waybill.id,
                     startpoint: waybill.start_point.full_address,
                     endpoint: waybill.end_point.full_address,
                     status: waybill.status })
    end
    @data
  end

  def routes
    render json: Waybill.find(params.permit(:id)[:id]).routes
  end

  def create
    waybill = Waybill.new(create_waybill)
    flash[:success] = 'waybills succesfully created' if waybill.save && checkpoints(waybill)
  end

  def update
    waybill = Waybill.find(params.permit(:ids)[:ids])
    if waybill.update(status: 'Delivered to the recipient') && waybill.consignment.update(status: 'Transportation completed')
      flash[:success] = 'waybills succesfully updated'
    else
      flash[:error] = 'something did wrong '
    end
  end

  private

  def waybill_params
    params.require(:waybill).permit(:start_date, :end_date, :town, :street, :building,
                                    :end_town, :end_street, :end_building, :goods_owner)
  end

  def create_waybill
    start_point = Address.new(town: waybill_params[:town], street: waybill_params[:street],
                              building: waybill_params[:building])
    start_point.save
    end_point = Address.new(town: waybill_params[:end_town], street: waybill_params[:end_street],
                            building: waybill_params[:end_building])
    end_point.save
    owner = GoodsOwner.find_by(warehouse_name: waybill_params[:goods_owner]).id
    { start_date: waybill_params[:start_date], end_date: waybill_params[:end_date],
                startpoint: start_point.id, endpoint: end_point.id,
                consignment_id:  params.permit(:ttn_id)[:ttn_id],
                goods_owner_id: owner }
  end

  def checkpoints(waybill)
    params.permit(routes: [])[:routes].each do |city_name|
      Route.new(city: city_name, waybill_id: waybill.id).save
    end
  end
end
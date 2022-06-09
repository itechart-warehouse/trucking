# frozen_string_literal: true

class GoodsController < ApplicationController
  before_action :set_consignment, only: :update

  def update
    authorize! :update, Good
    authorize! :update, Consignment

    @goods = @consignment.goods.where(id: params[:selectedGoodsIds])
    if status_validation(params[:status])
      Good.transaction do
        @goods.each { |item| item.update!(status: params[:status]) }
        if params[:status] == 'checked'
          @consignment.update!(status: params[:status], manager: current_user)
        else
          @consignment.update!(status: params[:status])
        end
      end
      render json: @consignment
    else
      render json: "record don't pass validation", status: :unprocessable_entity
    end
  end

  private

  def status_validation(status)
    if status == 'checked'
      return true unless current_user.role == 'driver'
    elsif @consignment.waybill.status == 'delivered to the recipient'
      true
    end
  end

  def set_consignment
    @consignment = Consignment.find(params[:consignment_id])
  end
end

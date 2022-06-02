# frozen_string_literal: true

class WriteOffActsController < ApplicationController
  def index
    authorize! :read, WriteOffAct
    company_consignments
    write_off_acts,meta = paginate_collection(WriteOffAct.where(consignment: @consignments))
    @write_off_acts_count = meta[:total_count]
    @serialized_write_off_acts = ActiveModelSerializers::SerializableResource.new(write_off_acts).to_json
    @serialized_consignments = ActiveModelSerializers::SerializableResource.new(@consignments).to_json
    render json: write_off_acts if params[:page]
    if params[:search_data]
      render json: Consignment.where(['bundle_seria = ? and bundle_number = ?',
                                      params[:search_data].split[0], params[:search_data].split[1]])
    end
    render json: WriteOffAct.joins(" INNER JOIN consignments ON consignments.id = write_off_acts.consignment_id").search(params[:search_data])if params[:search_data]
  end

  def create
    authorize! :create, WriteOffAct
    write_off_act = WriteOffAct.new(create_write_off_act_params)
    if write_off_act.save
      render json: write_off_act
    else
      render json: write_off_act.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def permit_write_off_act_params
    params.permit(:good_name, :lost_quantity, :consignment, :description)
  end

  def create_write_off_act_params
    write_off_act_params = permit_write_off_act_params
    write_off_act_params[:consignment] = find_consigment_from_params
    write_off_act_params
  end

  def find_consigment_from_params
    consignment_credentials = permit_write_off_act_params[:consignment].split
    consignment_seria = consignment_credentials[0]
    consignment_number = consignment_credentials[1]
    Consignment.find_by(
      consignment_seria: consignment_seria, consignment_number: consignment_number
    )
  end

  def company_consignments
    return @consignments = Consignment.all if current_user.role.role_name == 'system administrator'

    company_dispatchers = User.where(role: Role.find_by(role_name: 'dispatcher'),
                                     company: current_user.company)
    @consignments = Consignment.where(dispatcher: company_dispatchers).order({ created_at: :desc })
  end
end

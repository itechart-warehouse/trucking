# frozen_string_literal: true

class WarehousesController < ApplicationController
  before_action :set_warehouse, only: %i[update destroy]
  @@warehouses_per_page = 5

  def index
    warehouses = Warehouse.all.limit(@@warehouses_per_page)
    warehousemans = User.where(role: Role.find_by(role_name: 'warehouseman'))
    @warehouses_count = Warehouse.all.count
    @serialized_warehouses = ActiveModelSerializers::SerializableResource.new(warehouses).to_json
    @serialized_warehousemans = ActiveModelSerializers::SerializableResource.new(warehousemans).to_json
  end

  def page
    page = params.fetch(:page, 0).to_i * @@warehouses_per_page
    if params[:perPage]
      @@warehouses_per_page = params[:perPage].to_i
    end
    warehouses = Warehouse.all.offset(page).limit(@@warehouses_per_page)
    render json: ActiveModelSerializers::SerializableResource.new(warehouses).to_json
  end

  def create
    warehouse = Warehouse.new(create_warehouse_params)
    if warehouse.save
      render json: warehouse
    else
      render json: warehouse.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @warehouse.destroy
  end

  def update
    if @warehouse.update(permit_warehouse_params)
      render json: @warehouse
    else
      render json: @warehouse.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def set_warehouse
    @warehouse = Warehouse.find(params.require(:id))
  end

  def permit_warehouse_params
    params.permit(%i[warehouse_name apartment building street town warehouseman trusted])
  end

  def create_warehouse_params
    create_warehouse_params = permit_warehouse_params
    create_warehouse_params[:address] = Address.new(town: permit_warehouse_params[:town],
                                                    street: permit_warehouse_params[:street],
                                                    building: permit_warehouse_params[:building],
                                                    apartment: permit_warehouse_params[:apartment])
    find_warehouseman(create_warehouse_params)
    create_warehouse_params.except(:town, :street, :building, :apartment)
  end

  def find_warehouseman(create_warehouse_params)
    warehouseman_fio = create_warehouse_params[:warehouseman].split
    create_warehouse_params[:warehouseman] = User.find_by(second_name: warehouseman_fio[0],
                                                          first_name: warehouseman_fio[1],
                                                          middle_name: warehouseman_fio[2])
    create_warehouse_params
  end
end

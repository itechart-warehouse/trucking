# frozen_string_literal: true

class Settings::UnitsController < ApplicationController
  load_and_authorize_resource
  before_action :set_unit, only: %i[show update destroy]

  def index
    query = Unit.all
    if params[:search].present?
      query = query.by_name(params[:search].squish)
    end
    @units, meta = paginate_collection(query)
    @units_count = meta[:total_count]
    if params[:page]
      render json: { units: @units, total_count: meta[:total_count] }
    end
  end

  def show
    render json: @unit
  end

  def create
    unit = Unit.new(unit_params)
    if unit.save
      render json: unit
    else
      render json: unit.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @unit.update(unit_params)
      render json: @unit
    else
      render json: @unit.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @unit.destroy
  end

  private

  def set_unit
    @unit = Unit.find(params[:id])
  end

  def unit_params
    params.permit(:name, :short_name)
  end
end

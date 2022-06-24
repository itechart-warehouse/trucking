# frozen_string_literal: true

class Settings::CountriesController < ApplicationController
  before_action :find_country, only: %i[update destroy]

  def index
    query = Country.all
    query = query.by_name(params[:search]) if params[:search].present?
    @countries, meta = paginate_collection(query)
    @total_count = meta[:total_count]
    render json: { countries: @countries, total_count: @total_count } if params[:page].present?
  end

  def update
    render_object(@country) { @country.update(country_params) }
  end

  def create
    country = Country.new(country_params)
    render_object(country) { country.save }
  end

  def destroy
    @country.destroy
  end

  private

  def find_country
    @country = Country.find(params[:id])
  end

  def country_params
    params.permit(:name)
  end
end

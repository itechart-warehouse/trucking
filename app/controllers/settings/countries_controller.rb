# frozen_string_literal: true

class Settings::CountriesController < ApplicationController
  before_action :find_country, only: %i[update destroy]

  def index
    @countries, meta = paginate_collection(Country.all)
    @total_count = meta[:total_count]
    render json: { countries: @countries, total_count: @total_count } if params[:page].present?
  end

  def update
    answer(@country) { @country.update(country_params) }
  end

  def create
    country = Country.new(country_params)
    answer(country) { country.save }
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

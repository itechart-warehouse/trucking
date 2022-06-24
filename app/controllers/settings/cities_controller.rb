# frozen_string_literal: true

class Settings::CitiesController < ApplicationController
  before_action :find_country
  before_action :find_city, only: %i[update destroy]

  def index
    cities, meta = paginate_collection(@country.cities)
    render json: { cities: cities, total_count: meta[:total_count] }
  end

  def update
    answer(@city) { @city.update(city_params) }
  end

  def create
    city = @country.cities.new(city_params)
    answer(city) { city.save }
  end

  def destroy
    @city.destroy
  end

  private

  def find_country
    @country = Country.find(params[:country_id])
  end

  def find_city
    @city = @country.cities.find_by(id: params[:id])
  end

  def city_params
    params.permit(:name)
  end
end

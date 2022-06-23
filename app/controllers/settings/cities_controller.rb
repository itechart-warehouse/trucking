# frozen_string_literal: true

class Settings::CitiesController < ApplicationController
  before_action :find_city, only: %i[update destroy]
  before_action :find_country, only: %i[index create]

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
    @country=Country.find(params[:country_id])
  end

  def find_city
    @city = City.find(params[:id])
  end

  def answer(city)
    if yield
      render json: city
    else
      render json: city.errors.full_messages, status: :unprocessable_entity
    end
  end

  def city_params
    params.permit(:name)
  end
end

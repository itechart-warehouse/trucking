# frozen_string_literal: true

class CountriesController < ApplicationController
  def index
    @countries, meta = paginate_collection(Country.all)
    @total_count = meta[:total_count]
    render json: { countries: @countries, total_count: @total_count } if params[:page].present?
  end

  def update
    country = Country.find(params[:id])
    answer(country) { country.update(name: country_params[:name]) }
  end

  def create
    country = Country.new(country_params)
    answer(country) { country.save }
  end

  def destroy
    Country.find(params[:id]).destroy
  end

  private

  def answer(country)
    if yield
      render json: country
    else
      render json: country.errors.full_messages, status: :unprocessable_entity
    end
  end

  def country_params
    params.permit(:name)
  end
end

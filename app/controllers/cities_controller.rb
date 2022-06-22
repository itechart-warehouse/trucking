class CitiesController < ApplicationController
  def index
    cities, meta = paginate_collection(Country.find(params[:country_id]).city)
    render json: {cities: cities, total_count: meta[:total_count] }
  end

  def update
    city = City.find(params[:id])
    answer(city) {city.update(name: city_params[:name])}
  end

  def create
    city = Country.find(params[:country_id]).city.new(city_params)
    answer(city) {city.save}
  end

  def destroy
    City.find(params[:id]).destroy
  end

  private

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

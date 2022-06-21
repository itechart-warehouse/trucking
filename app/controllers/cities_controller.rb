class CitiesController < ApplicationController
  def index
    citys, meta = paginate_collection(Country.find(params[:country_id]).City)
    render json: {countys: countrys, total_count: meta[:total_count] }
  end

  def update

  end

  def destroy

  end

  def create

  end
end

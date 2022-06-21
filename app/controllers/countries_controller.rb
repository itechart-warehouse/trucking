class CountriesController < ApplicationController
  def index
    countries, meta = paginate_collection(Country.all)
    respond_to do |format|
      format.html
      format.json { render  countries: countries, total_count: meta[:total_count]}
    end
  end

  def update

  end

  def destroy

  end

  def create

  end
end

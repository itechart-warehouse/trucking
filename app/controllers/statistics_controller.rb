# frozen_string_literal: true

class StatisticsController < ApplicationController
  def index
    statistics = Statistics.where.not(user_id: nil).alphabetical_sort
    statistics = statistics.search_name(params[:name]) if params[:name].present?
    statistics = statistics.search_action(params[:actions]) if params[:actions].present?
    if params[:start_date].present? && params[:end_date].present?
      statistics = statistics.search_date(params[:start_date], params[:end_date])
    end
    statistics, meta = paginate_collection(statistics)
    @statistics_count = meta[:total_count]
    @serialized_statistics = ActiveModelSerializers::SerializableResource.new(statistics).to_json
    respond_to do |format|
      format.html
      format.json { render json: @serialized_statistics }
    end
  end
end

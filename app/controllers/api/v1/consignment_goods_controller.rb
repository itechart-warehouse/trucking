# frozen_string_literal: true

module Api
  module V1
    class ConsignmentGoodsController < ApiController
      before_action :set_consignment_goods, only: :index
      def index
        authorize! :read, Good
        excluded_columns = %w[created_at updated_at]
        goods_api_columns = Good.attribute_names - excluded_columns
        render json: @goods.select(goods_api_columns)
      end

      private

      def set_consignment_goods
        @consignment = Consignment.find(params[:consignment_id])
        @goods = @consignment.goods
      end
    end
  end
end

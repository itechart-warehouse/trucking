# frozen_string_literal: true

module Api
  module V1
    class ConsignmentsController < ApiController
      def index
        authorize! :read, Consignment
        excluded_columns = %w[created_at updated_at]
        consignment_api_columns = Consignment.attribute_names.reject do |column|
          excluded_columns.include? column
        end
        if params[:search]
          render json: Consignment.search(params[:search])
        else
          render json: Consignment.select(consignment_api_columns).to_json(include: included_params)
        end
        consignment_api_columns = Consignment.attribute_names - excluded_columns
        consignments, meta = paginate_collection(Consignment.select(consignment_api_columns))
        render json: { consignments: consignments.to_json(include: included_params),
                       consignments_count: meta[:total_count] }
      end

      def show
        authorize! :read, Consignment
        render json: Consignment.find(params[:id]).to_json(include: included_params)
      end

      private

      def included_params
        [
          truck: { only: %i[truck_number],
                   include: [truck_type: { only: :truck_type_name }] },
          driver: { except: %i[id created_at updated_at role_id email login address_id],
                    include: [role: { only: :role_name }, company: { only: :name }] }
        ]
      end
    end
  end
end

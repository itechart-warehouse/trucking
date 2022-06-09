# frozen_string_literal: true

module Api
  module V1
    class DriversController < ApiController
      def index
        authorize! :read, User
        excluded_columns = %w[created_at updated_at role_id address_id]
        drivers_api_columns = User.attribute_names - excluded_columns
        query = User.select(drivers_api_columns).joins(:role).where(roles: { role_name: 'driver' })
        drivers, meta = paginate_collection(query)
        render json: { drivers: drivers.to_json(include: [company: { only: :name }]),
                       drivers_count: meta[:total_count] }
      end
    end
  end
end

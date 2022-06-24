# frozen_string_literal: true

module Concerns
  module Answers

    def render_object(object)
      if yield
        render json: city
      else
        render json: city.errors.full_messages, status: :unprocessable_entity
      end
    end

  end
end

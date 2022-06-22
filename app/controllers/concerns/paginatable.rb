# frozen_string_literal: true

module Concerns
  module Paginatable
    def offset_value
      ((params.fetch(:page, 0).to_i + 1) * default_page_size) - default_page_size
    end

    def default_page_size
      params[:per_page].to_i <= 0 ? 5 : params[:per_page].to_i
    end

    def paginate_collection(collection)
      [collection.offset(offset_value).limit(default_page_size),
       { page: params.fetch(:page, 0), total_count: total_count(collection),
         page_count: page_count(collection) }]
    end

    private

    def total_count(collection)
      collection.size
    end

    def page_count(collection)
      (collection.length.to_f / default_page_size).ceil
    end
  end
end

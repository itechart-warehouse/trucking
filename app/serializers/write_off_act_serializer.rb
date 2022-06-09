# frozen_string_literal: true

class WriteOffActSerializer < ActiveModel::Serializer
  attributes :id, :good_name, :lost_quantity, :description
  belongs_to :consignment
end

# frozen_string_literal: true

class WarehouseSerializer < ActiveModel::Serializer
  attributes :id, :warehouse_name, :trusted
end

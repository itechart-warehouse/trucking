# frozen_string_literal: true

class AddressSerializer < ActiveModel::Serializer
  attributes :id, :town, :street, :building, :apartment
end

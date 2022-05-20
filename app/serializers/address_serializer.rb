class AddressSerializer < ActiveModel::Serializer
  attributes :id, :town, :street, :building, :apartment
end

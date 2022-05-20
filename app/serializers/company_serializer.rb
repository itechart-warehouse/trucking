class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :is_suspended
end

class CheckpointSerializer < ActiveModel::Serializer
  attributes :id, :city, :pass_date, :is_passed
end

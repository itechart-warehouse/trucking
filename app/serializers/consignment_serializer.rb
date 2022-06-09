# frozen_string_literal: true

class ConsignmentSerializer < ActiveModel::Serializer
  attributes :id, :bundle_seria, :bundle_number, :consignment_seria, :consignment_number, :status,
             :driver, :dispatcher, :manager, :truck, :waybill
  has_many :goods

  def driver
    "#{object.driver.second_name} #{object.driver.first_name} #{object.driver.middle_name}"
  end

  def dispatcher
    "#{object.dispatcher.second_name} #{object.dispatcher.first_name} #{object.dispatcher.middle_name}"
  end

  def manager
    if object.manager
      "#{object.manager.second_name} #{object.manager.first_name} #{object.manager.middle_name}"
    end
  end

  def truck
    object.truck.truck_number.to_s
  end

  def waybill
    object.waybill&.status
  end
end

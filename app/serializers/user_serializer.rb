# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :second_name, :middle_name, :birthday, :login, :passport
  belongs_to :role
  belongs_to :company
  belongs_to :address
end

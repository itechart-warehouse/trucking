# frozen_string_literal: true

class User < ApplicationRecord
  audited

  belongs_to :role, optional: true
  belongs_to :company, optional: true
  belongs_to :address, optional: true
  has_many :driver_consignments, dependent: :restrict_with_exception, class_name: 'Consignment',
                                 foreign_key: 'driver_id'
  has_many :dispatcher_consignments, dependent: :restrict_with_exception, class_name: 'Consignment',
                                     foreign_key: 'dispatcher_id'
  has_many :manager_consignments, dependent: :restrict_with_exception, class_name: 'Consignment',
                                  foreign_key: 'manager_id'
  has_one :warehouse, dependent: :restrict_with_exception, class_name: 'Warehouse',
                      foreign_key: 'warehouseman_id'
  validates :first_name, presence: true, length: { in: 3..30 }
  validates :second_name, presence: true, length: { in: 3..30 }
  validates :middle_name, presence: true, length: { in: 3..30 }
  validates :login, presence: true, uniqueness: true, length: { in: 3..30 }
  validates_each :birthday do |record, attr, value|
    Date.parse(value.to_s)
  rescue StandardError
    record.errors.add(attr, 'Invalid date')
  end
  before_validation :generate_password, on: :create
  # Include default devise modules. Others available are:
  # :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :timeoutable,
         :validatable, :confirmable, :lockable

  scope :search, lambda { |search_data|
                   where(['second_name LIKE ? and first_name LIKE ? and middle_name = ?',
                          search_data.split[0], search_data.split[1], search_data.split[2]])
                 }

  def active_for_authentication?
    if company
      super && !company.is_suspended
    else
      super
    end
  end

  def inactive_message
    company.is_suspended ? :user_company_suspended : super
  end

  private

  def generate_password
    self.password = SecureRandom.hex(8)
  end
end

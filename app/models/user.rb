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

  scope :by_name, ->(search) {
                    sec_name, first_name, mid_name = search.split
                    query = "second_name ILIKE '#{sec_name}%'"
                    query += "and first_name ILIKE '#{first_name}'" if first_name.present?
                    query += " and middle_name ILIKE '#{mid_name}%'" if mid_name.present?
                    where(query)
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

  def sysadmin?
    role.role_name == 'system administrator'
  end

  private

  def generate_password
    self.password = SecureRandom.hex(8)
  end
end

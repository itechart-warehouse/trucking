# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "test#{i}@test.com" }
    password { 'password1' }
    first_name { 'Ivan' }
    second_name { 'Ivanov' }
    middle_name { 'Ivanovich' }
    birthday { '01/01/1970' }
    passport { '43243451, issued by the police department of the Leninsky district of Minsk' }
    role_id { 5 }
    confirmed_at { DateTime.now }
    sequence(:login) { |i| "login_#{i}" }
    association(:company)
    association(:address)
    role

    trait :sysAdmin do
      association :role, factory: :sysAdmin_role
    end

    trait :driver do
      association :role, factory: :driver_role
    end

    trait :dispatcher do
      association :role, factory: :dispatcher_role
    end

    trait :manager do
      association :role, factory: :manager_role
    end

    trait :warehouseman do
      association :role, factory: :warehouseman_role
    end

    factory :user_driver, traits: [:driver]
    factory :user_dispatcher, traits: [:dispatcher]
    factory :user_manager, traits: [:manager]
    factory :user_warehouseman, traits: [:warehouseman]
    factory :user_sysAdmin, traits: [:sysAdmin]
  end
end

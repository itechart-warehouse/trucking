# frozen_string_literal: true
require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  root 'pages#home'
  # User
  devise_for :users, controllers: { confirmations: 'users/confirmations' }

  scope '/users' do
    get '', to: 'pages#users_index', as: 'users'
    post '/create', to: 'pages#create_user'
    get '/:id', to: 'pages#user_data'
    patch '/:id/edit', to: 'pages#update_user'
    delete '/:id', to: 'pages#destroy_user'
  end

  # Companies
  resources :companies, except: :show

  namespace :settings do
    resources :countries do
      resources :cities
    end
  end

  # Consignment
  resources :consignments, only: %i[create index]

  patch 'consignment/:consignment_id/goods', to: 'goods#update'

  # Write off acts
  resources :write_off_acts, only: %i[index create]

  # Waybills
  resources :waybills, except: :show

  # warehouses
  resources :warehouses, except: %i[show] do
    collection do
      patch 'trust/:id', to: 'warehouses#trust_warehouse'
    end
  end

  # Checkpoints
  patch '/checkpoints', to: 'checkpoints#update'

  # Statistics
  resources :statistics, only: :index

  # System resources
  namespace :settings do
    resources :units
  end

  # API
  namespace :api do
    # V1 API DEPRECATED
    # disable after demonstration
    namespace :v1 do
      resources :consignments, only: %i[index show] do
        resources :consignment_goods, only: :index
      end
      resources :drivers, only: :index

      resources :trucks, only: :index
    end
    namespace :v2 do
      resources :consignments, only: %i[index show]
    end
  end
end

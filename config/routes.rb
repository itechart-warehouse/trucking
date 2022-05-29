# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'
  # User
  devise_for :users
  scope '/users' do
    get '', to: 'members#index', as: 'users'
    post '/create', to: 'members#create'
    get '/:id', to: 'members#show'
    patch '/:id/edit', to: 'members#update'
    delete '/:id', to: 'members#destroy'
  end
  # Companies
  resources :companies, except: :show

  # Consignment
  resources :consignments, only: %i[index create]
  patch 'consignment/:consignment_id/goods', to: 'goods#update'

  # Write off acts
  resources :write_off_acts, only: %i[index create]

  # Waybills
  resources :waybills, except: :show

  # warehouses
  resources :warehouses, except: :show do
    collection do
      patch 'trust/:id', to: 'warehouses#trust_warehouse'
    end
  end

  # Checkpoints
  patch '/checkpoints', to: 'checkpoints#update'

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

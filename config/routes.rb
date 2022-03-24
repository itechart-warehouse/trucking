# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :companies
  scope '/companies' do
    post '/create', to: 'companies#create_company'
    patch '/suspend/:id', to: 'companies#suspend'
  end
  resources :goods
  resources :consignments
  scope '/consignments' do
    get '/:id/goods', to: 'goods#get_consignment_goods'
    patch '/:id/goods', to: 'goods#set_goods_cheked_status'
  end
  resources :trucks
  get '/users', to: 'pages#users_index'
  scope '/users' do
    post '/create', to: 'pages#create_user'
    get '/drivers', to: 'pages#get_drivers'
    delete '/:id', to: 'pages#destroy_user'
    get '/:id', to: 'pages#user_data'
    patch 'edit/:id', to: 'pages#update_user'
  end
  scope '/waybill' do
    post '/create' ,to:'waybill#create'
  end
  get '/consignment/waybill_data/:ttn_id' ,to: 'consignments#waybill_data'
  get '/goodsowners' ,to: 'goods_owner#index'
end

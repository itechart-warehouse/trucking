# frozen_string_literal: true

class MemberController < ApplicationController
  before_action :set_user, only: %i[update show destroy]

  def show
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    authorize! :create, User
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    User.find(params.require(:id)).destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def permit_user_params
    params.permit(:first_name, :second_name, :middle_name, :birthday,
                  :passport, :login, :email, :town, :street,
                  :building, :apartment, :company, :password, :password_confirmation)
  end

  def user_params
    user_params = permit_user_params
    user_params[:address] = Address.new(town: permit_user_params[:town],
                                        street: permit_user_params[:street],
                                        building: permit_user_params[:building],
                                        apartment: permit_user_params[:apartment])
    if permit_user_params[:company].present?
      user_params[:company] = Company.find_by(name: permit_user_params[:company])
    end
    user_params.except(:town, :street, :building, :apartment)
  end
end
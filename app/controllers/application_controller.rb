# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Concerns::Paginatable
  include Concerns::Answers
  rescue_from CanCan::AccessDenied, with: :access_denied
  rescue_from ActiveRecord::DeleteRestrictionError, with: :record_delete_error
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  before_action :authenticate_user!
  around_action :switch_locale

  private

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def record_not_found(error)
    render json: error, status: :not_found
  end

  def record_invalid(error)
    render json: error, status: :unprocessable_entity
  end

  def record_delete_error(exception)
    render json: exception.message, status: :method_not_allowed
  end

  def access_denied(exception)
    render json: exception.message, status: :method_not_allowed
  end
end

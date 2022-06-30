# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Concerns::Paginatable
  include Concerns::Answers
  rescue_from CanCan::AccessDenied, with: :access_denied
  rescue_from ActiveRecord::DeleteRestrictionError, with: :record_delete_error
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::MethodNotAllowed, with: :method_is_not_allowed
  before_action :authenticate_user!

  private

  def method_is_not_allowed
    redirect_to error_405_path
  end

  def record_not_found
    redirect_to error_404_path
  end

  def record_invalid(error)
    render json: error, status: :unprocessable_entity
  end

  def record_delete_error(exception)
    render json: exception.message, status: :method_not_allowed
  end

end

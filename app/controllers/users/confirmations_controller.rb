# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # GET /resource/confirmation/new
    # def new
    #   super
    # end

    # POST /resource/confirmation
    # def create
    #   super
    # end

    # GET /resource/confirmation?confirmation_token=abcdef
    def show
      self.resource = resource_class.confirm_by_token(params[:confirmation_token])
      reset_token = params[:reset_password_token]
      yield resource if block_given?

      if resource.errors.empty? || resource.confirmed?
        set_flash_message!(:notice, :confirmed)
        respond_with_navigational(resource) do
          redirect_to after_confirmation_path_for(resource_name, resource, reset_token)
        end
      else
        respond_with_navigational(resource.errors, status: :unprocessable_entity) { render :new }
      end
    end

    # protected

    # The path used after resending confirmation instructions.
    # def after_resending_confirmation_instructions_path_for(resource_name)
    #   super(resource_name)
    # end

    # The path used after confirmation.
    def after_confirmation_path_for(_resource_name, resource, reset_token)
      edit_password_url(resource, reset_password_token: reset_token)
    end
  end
end

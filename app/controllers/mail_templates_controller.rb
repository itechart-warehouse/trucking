# frozen_string_literal: true

class MailTemplatesController < ApplicationController
  load_and_authorize_resource

  before_action :set_mail_template, only: %i[update destroy show]

  def index
    templates = MailTemplate.all
    @serialized_templates = ActiveModelSerializers::SerializableResource.new(templates).to_json
  end

  def show
    render json: { name: @mail_template.name, body: @mail_template.content.body.to_html }
  end

  def create
    authorize! :create, MailTemplate

    template = MailTemplate.new(mail_template_params)

    if template.save
      render json: template
    else
      render json: template.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update; end

  def destroy
    if @mail_template.destroy
      render json: @serialized_templates
    else
      render json: 'Template was not deleted', status: :unprocessable_entity
    end
  end

  private

  def set_mail_template
    @mail_template = MailTemplate.find(params[:id])
  end

  def mail_template_params
    params.permit(:name, :content)
  end
end

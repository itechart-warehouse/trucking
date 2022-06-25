# frozen_string_literal: true

class MailTemplatesController < ApplicationController
  load_and_authorize_resource

  before_action :set_mail_template, only: %i[update destroy show]

  def index
    query = MailTemplate.all
    query = query.by_name(params[:search].squish) if params[:search].present?
    templates, meta = paginate_collection(query)
    @template_count = meta[:total_count]
    @serialized_templates = ActiveModelSerializers::SerializableResource.new(templates).to_json
    render json: { templates: @serialized_templates, total_count: @template_count } if params[:page]
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

  def update
    authorize! :create, MailTemplate

    if @mail_template.update(mail_template_params)
      render json: @mail_template
    else
      render json: @mail_template.errors.full_messages, status: :unprocessable_entity
    end
  end

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

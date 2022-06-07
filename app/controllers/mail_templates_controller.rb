class MailTemplatesController < ApplicationController
    before_action :set_mail_template, only: %i[create update destroy]
    def index
      templates = MailTemplate.all
      @serialized_templates = ActiveModelSerializers::SerializableResource.new(templates).to_json
    end

    def show

    end

    def create

    end

    def update

    end

    def destroy
      if @mail_template.destroy
        render json: @serialized_templates
      else
        render json: "Template was not deleted", status: :unprocessable_entity
      end
    end

    private

    def set_mail_template
      @mail_template = MailTemplate.find(params[:id])
    end

    def mail_template_params
      params.require(:mail_template).permit(:name, :content)
    end
end

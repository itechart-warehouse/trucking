class MailTemplatesController < ApplicationController

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
        
    end

    private

    def template_params
        params.permit(:name, :content)
    end
end

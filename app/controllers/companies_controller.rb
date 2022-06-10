# frozen_string_literal: true

class CompaniesController < ApplicationController
  load_and_authorize_resource

  def index
    query = companies_query
    query = query.by_name(params[:search].squish) if params[:search].present?
    companies, meta = paginate_collection(query)
    @companies_count = meta[:total_count]
    @serialized_companies = ActiveModelSerializers::SerializableResource.new(companies).to_json
    if params[:page]
      render json: { companies: @serialized_companies, total_count: @companies_count }
    end
  end

  def update
    @company = Company.find(params.require(:id))
    @company.change_status
    render json: @company
    # company_users = User.where(company: company)
    # TODO: ideally we need to log out all company logged in users
    # but devise doesnt provide such feature
    # company_users.each do |user|
    #   sign_out user
    # end
  end

  def create
    authorize! :create, Company
    @company = Company.create!(company_params)
    render json: @company
  end

  def destroy
    Company.find(params.require(:id)).destroy
  end

  private

  def  companies_query
    if current_user.company
      Company.accessible_by(current_ability)
    else
      Company.all
    end
  end

  def company_params
    params.permit(:name)
  end
end

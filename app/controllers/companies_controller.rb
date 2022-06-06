# frozen_string_literal: true

class CompaniesController < ApplicationController
  load_and_authorize_resource

  def index
    companies,meta = if current_user.company
                       paginate_collection(Company.accessible_by(current_ability))
                     else
                       paginate_collection(Company.all)
                     end
    @companies_count = meta[:total_count]
    @serialized_companies = ActiveModelSerializers::SerializableResource.new(companies).to_json
    render json: Company.search(params[:search_data]) if params[:search_data]
    render json: Company.where(name: params[:search_data]) if params[:search_data]
    render json: companies if params[:page]
    render json: companies.search(params[:search_data]) if params[:search_data]
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

  def company_params
    params.permit(:name)
  end
end

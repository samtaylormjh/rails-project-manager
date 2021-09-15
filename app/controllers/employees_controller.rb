class EmployeesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @employees = Employee.all
  end

  def create
    employee_params = params[:employee].permit(:fname, :lname)
    emergency_contact_params = params[:employee].permit(emergency_contacts: [:fname, :lname, :number, :primary])
    
    @employee = Employee.create(employee_params)

    if emergency_contact_params.present?
      emergency_contact_params["emergency_contacts"].each do |ec|
        @employee.emergency_contacts.create(ec)
      end
    end
    
    render :show
  end

  def destroy
    @employee = Employee.find(params[:id])
    if @employee.destroy
      render :show
    end
  end

  def update
    @employee = Employee.find(params[:id])
    emergency_contact_params = params[:employee].permit(emergency_contacts: [:fname, :lname, :number, :primary])
    
    if @employee.update(employee_params)
      binding.pry
      render :show, status: :ok, location: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end

  end

  private
    def employee_params
      params.require(:employee).permit(:fname, :lname)
    end
end

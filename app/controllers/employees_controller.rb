class EmployeesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @employees = Employee.all
  end

  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      render :show
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    if @employee.destroy
      render :show
    end
  end

  def update
    @employee = Employee.find(params[:id])
    if @employee.update(employee_params)
      render :show
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  private
    def employee_params
      params.require(:employee).permit(:fname, :lname, emergency_contacts_attributes: [:id, :fname, :lname, :number, :primary, :_destroy])
    end
end

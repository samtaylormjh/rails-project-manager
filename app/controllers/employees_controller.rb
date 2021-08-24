class EmployeesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @employees = Employee.all
  end

  def create
    employee_params = params[:employee].permit(:fname, :lname, project: [])
    Employee.create(employee_params)
    head :ok
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

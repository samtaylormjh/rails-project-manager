class EmployeesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @employees = Employee.all
  end

  def create
    employee_params = params[:employee].permit(:fname, :lname)
    Employee.create(employee_params)
    head :ok
  end
end

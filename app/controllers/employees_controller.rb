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
    emergency_contact_params = params[:employee].permit(emergency_contacts: [:id, :fname, :lname, :number, :primary])
    
    current_ec = @employee.emergency_contacts.map{|ec| ec.id}
    updated_ec = emergency_contact_params["emergency_contacts"].map{|ec|ec["id"]}

    if @employee.update(employee_params)
      ec_to_delete = current_ec - updated_ec
      ec_to_delete.each do |ec|
        if ec.present?
          @employee.emergency_contacts.find_by(id:ec).destroy
        end
      end

    @employee = Employee.find(params[:id])      
      
      if emergency_contact_params.present?
        emergency_contact_params["emergency_contacts"].each do |ec| 
          if ec["id"].present? 
            find_ec = @employee.emergency_contacts.find(ec["id"])
            find_ec.update(ec.except("id"))
          else
            @employee.emergency_contacts.create(ec)
          end
        end
      end
      
      render :show
    end
  end

  private
    def employee_params
      params.require(:employee).permit(:fname, :lname)
    end
end

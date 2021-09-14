class AddPrimaryToEmployeeEmergencyContacts < ActiveRecord::Migration[6.1]
  def change
    add_column :employee_emergency_contacts, :primary, :boolean
  end
end

class CreateEmployeeEmergencyContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_emergency_contacts do |t|
      t.integer :employee_id
      t.string :fname
      t.string :lname
      t.integer :number

      t.timestamps
    end
  end
end

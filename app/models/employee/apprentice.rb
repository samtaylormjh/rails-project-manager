class Employee::Apprentice < ApplicationRecord
  # employee_id
  # apprentice_id

  belongs_to :employee
  belongs_to :apprentice_employee, :class_name => "Employee", :foreign_key => "apprentice_id"
end
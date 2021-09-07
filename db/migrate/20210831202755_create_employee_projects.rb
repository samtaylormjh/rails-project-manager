class CreateEmployeeProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_projects do |t|
      t.belongs_to :employee
      t.belongs_to :project
      t.timestamps
    end
  end
end

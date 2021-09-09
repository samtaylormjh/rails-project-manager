class CreateProjectSiteSupervisors < ActiveRecord::Migration[6.1]
  def change
    create_table :project_site_supervisors do |t|
      t.integer :project_id
      t.integer :employee_id

      t.timestamps
    end
  end
end

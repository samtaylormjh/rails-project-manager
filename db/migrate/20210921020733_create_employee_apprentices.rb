class CreateEmployeeApprentices < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_apprentices do |t|
      t.integer :employee_id
      t.integer :apprentice_id

      t.timestamps
    end
  end
end

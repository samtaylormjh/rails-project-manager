class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.string :number
      t.string :fname
      t.string :lname
      t.string :project

      t.timestamps
    end
  end
end

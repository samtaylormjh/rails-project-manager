class ChangeNumberToString < ActiveRecord::Migration[6.1]
  def change
    change_column :employee_emergency_contacts, :number, :string
  end
end

class ChangeProjectFormat < ActiveRecord::Migration[6.1]
  def self.up
    change_column :employees, :project, :string
  end

  def self.down
    change_column :employees, :project, 
end

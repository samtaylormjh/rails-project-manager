class AddNotesToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :notes, :text
  end
end

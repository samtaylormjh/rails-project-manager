class Employee < ApplicationRecord

  has_many :projects, :class_name => "Project::SiteSupervisor"

  def display_name
    self.fname + " " + self.lname
  end

end

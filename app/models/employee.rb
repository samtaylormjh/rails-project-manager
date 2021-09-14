class Employee < ApplicationRecord

  has_many :projects, :class_name => "Project::SiteSupervisor"
  has_many :emergency_contacts, :dependent => :destroy

  def display_name
    self.fname + " " + self.lname
  end

end

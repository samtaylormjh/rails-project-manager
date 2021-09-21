class Employee < ApplicationRecord

  has_many :projects, :class_name => "Project::SiteSupervisor"
  has_many :emergency_contacts, :dependent => :destroy
  has_many :apprentices, :dependent => :destroy

  accepts_nested_attributes_for :emergency_contacts, allow_destroy: true
  accepts_nested_attributes_for :apprentices, allow_destroy: true

  def display_name
    self.fname + " " + self.lname
  end

end

class Employee < ApplicationRecord

  has_many :projects

  def display_name
    self.fname + " " + self.lname
  end

end

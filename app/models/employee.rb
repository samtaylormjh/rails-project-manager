class Employee < ApplicationRecord

  def display_name
    self.fname + " " + self.lname
  end

end

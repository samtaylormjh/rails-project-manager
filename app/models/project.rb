class Project < ApplicationRecord
  has_many :site_supervisors, :dependent => :destroy
  validates :name, :uniqueness => true
end

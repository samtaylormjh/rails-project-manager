class Project < ApplicationRecord
  has_many :site_supervisors, :dependent => :destroy

  accepts_nested_attributes_for :site_supervisors, allow_destroy: true

  validates :name, :uniqueness => true


end

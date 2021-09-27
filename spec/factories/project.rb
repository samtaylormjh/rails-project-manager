FactoryBot.define do
  factory :project do
      name {Faker::Company.unique.name}
  end

  factory :project_with_ss, :parent => :project do |project|
    after(:create) do |project|
      employees = create_list(:employee,2)
      employees.each do |emp|
        project.site_supervisors.create(employee_id:emp.id)
      end
    end
  end

end

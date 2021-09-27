FactoryBot.define do
  factory :employee do
    fname {Faker::Name.first_name}
    lname {Faker::Name.last_name}
  end

  factory :employee_with_apprentices, :parent => :employee do |employee|
    after(:create) do |employee|
      employees = create_list(:employee,1)
      employees.each do |emp|
        employee.apprentices.create(apprentice_id:emp.id)
      end
    end
  end
end

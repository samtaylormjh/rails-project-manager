require 'rails_helper'

RSpec.feature "Employees::Indices", type: :feature do
  describe "Employee Index page", :type => :feature do
    before :each do
      5.times do
        create(:employee_with_apprentices)
      end
      visit '/?tab=1'
    end

    scenario "Lists all employees" do
      expect(page).to have_css("table tbody tr", :count=>Employee.count)
    end

    scenario "Displays an employee correctly" do
      employee_to_check = create(:employee_with_apprentices)
      has_css?("table tbody tr", :count=>Employee.count)
      employee_id = find("table tbody tr:nth-child(#{employee_to_check.id}) td:nth-child(2)").text
      employee_fname = find("table tbody tr:nth-child(#{employee_to_check.id}) td:nth-child(3)").text
      employee_lname = find("table tbody tr:nth-child(#{employee_to_check.id}) td:nth-child(4)").text
      expect(employee_id.to_i).to eq(employee_to_check.id)
      expect(employee_fname).to eq(employee_to_check.fname)
      expect(employee_lname).to eq(employee_to_check.lname)
    end

    scenario "Checks that the new employee button routes to employees/new" do
      click_button('New Employee')
      expect(page).to have_current_path("/employees/new")
      expect(page).to have_selector("form")
      expect(page).to have_content("Employee")
    end

    scenario "Checks that the edit employee button routes to the correct /edit page" do
      find("a[href='/employees/#{Employee.last.id}/edit']").click
      expect(page).to have_current_path("/employees/#{Employee.last.id}/edit")
      expect(page).to have_selector("form")
      expect(page).to have_content("Employee")
    end

    scenario "Can delete an employee" do
      initial_employees_count = Employee.count
      employee_to_remove = Employee.last
      click_button(id: "#{employee_to_remove.id}.delete")
      expect(page).to_not have_selector("button[id='#{employee_to_remove.id}.delete']")
      expect(Employee.count).to eq(initial_employees_count-1)
    end

    scenario "Expanded projects display correctly" do
      # make project and employee with ss click on the box then expect the project id to be on the index page
       create(:project)
       create(:employee)
       Project.last.site_supervisors.create(employee_id: Employee.last.id)
       ss = Employee.last
       project = Project.last
       find("td[name='#{ss.id}_projects']").click
       expect(page).to have_content("#{project.id}")
    end
  end
end

require 'rails_helper'

RSpec.feature "Employees::New", type: :feature do
  describe "New Employee page", :type => :feature do
    before :each do
      5.times do
        create(:employee_with_apprentices)
      end
      visit '/?tab=1'
    end

    scenario "Loads the employee and displays the fields correctly navigated by table button" do
      new_employee = Employee.last
      find("a[href='/employees/#{new_employee.id}/edit']").click
      has_current_path?("/employees/#{new_employee.id}/edit")
      expect(page).to have_selector("input[name='fname']")
      expect(page).to have_field('fname', with: "#{new_employee.fname}")
    end

    scenario "Loads the employee and displays the fields correctly navigated by url" do
      new_employee = Employee.last
      visit "/employees/#{new_employee.id}/edit"
      has_selector?("input[name='fname']")
      expect(page).to have_field('fname', with: "#{new_employee.fname}")
    end

    scenario "Can update the first and last name of an existing employee" do
      new_employee = Employee.last
      find("a[href='/employees/#{new_employee.id}/edit']").click
      has_current_path?("/employees/#{new_employee.id}/edit")
      has_selector?("form")
      fill_in('fname', with: 'Updated')
      fill_in('lname', with: 'Name')
      click_button 'Submit'
      # Sleep with extra steps :P I'm unsure this is actually doing anything
      expect(page).to_not have_selector(".toast toast-success")
      # Update new_employee
      updated_employee = Employee.find(new_employee.id)
      expect(page).to have_current_path("/?tab=1")
      expect(updated_employee.display_name).to eq("Updated Name")
    end

    scenario "Adds an apprentice to an existing employee" do
      employee_to_add_apprentice = Employee.last
      find("a[href='/employees/#{employee_to_add_apprentice.id}/edit']").click
      has_current_path?("/employees/#{employee_to_add_apprentice.id}/edit")
      has_selector?("form")
      click_button('Assign Apprentice')
      has_selector?(".apprentices0__control")
      find('.apprentices0__control').click
      find(".apprentices0__option", text: Employee.first.display_name).click
      click_button('Submit')
      employee_with_new_apprentice = Employee.find(employee_to_add_apprentice.id)
      expect(employee_with_new_apprentice.apprentices.map{|a| a.apprentice_id}).to include(Employee.first.id)
    end 

    scenario "Updates an apprentice for an existing employee with apprentices" do
      employee_to_change = Employee.first
      find("a[href='/employees/#{employee_to_change.id}/edit']").click
      has_current_path?("/employees/#{employee_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".apprentices0__control")
      
      find('.apprentices0__control').click
      find(".apprentices0__option", text: Employee.second.display_name).click
      click_button('Submit')
      
      # Checks the original employee has been updated
      employee_after_change = Employee.find(employee_to_change.id)
      expect(employee_after_change.apprentices.first.apprentice_id).to eq(Employee.second.id)
    end

    scenario "Removes an apprentice from employee with existing apprentices" do
      employee_to_change = Employee.first
      initial_apprentice_count = employee_to_change.apprentices.count
      find("a[href='/employees/#{employee_to_change.id}/edit']").click
      has_current_path?("/employees/#{employee_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".apprentices0__control")

      find('#apprentice_delete_0').click
      click_button('Submit')
      employee_after_change = Employee.find(employee_to_change.id)
      expect(employee_after_change.apprentices.count).to eq(initial_apprentice_count-1)
    end

    scenario "Adds/Updates and Removes apprentices from existing employee" do
      # Add a second apprentice to the first employee
      Employee.first.apprentices.create(apprentice_id:Employee.third.id)
      employee_to_change = Employee.first
      initial_apprentice_count = employee_to_change.apprentices.count

      apprentice_to_remove = employee_to_change.apprentices.first
      apprentice_to_update = employee_to_change.apprentices.second
      apprentice_to_create = create(:employee)
      find("a[href='/employees/#{employee_to_change.id}/edit']").click
      has_current_path?("/employees/#{employee_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".apprentices0__control")
      # Delete the first apprentice
      find("#apprentice_delete_0").click

      # Add Employee.first as a new apprentice
      click_button('Assign Apprentice')
      find('.apprentices2__control').click
      find(".apprentices2__option", text: apprentice_to_create.display_name).click
      
      # Update the remaining initial apprentice 
      find('.apprentices0__control').click
      find(".apprentices0__option", text: apprentice_to_update.apprentice_employee.display_name).click
      click_button('Submit')

      updated_employee = Employee.find(employee_to_change.id)
      
      updated_apprentice = updated_employee.apprentices.map{|a|a.apprentice_id}
      expect_apprentice_to_be = [apprentice_to_update.apprentice_id,apprentice_to_create.id]

      expect(updated_apprentice).to eq(expect_apprentice_to_be)
    end
  end
end

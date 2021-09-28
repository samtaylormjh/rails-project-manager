require 'rails_helper'

RSpec.feature "Employees::New", type: :feature do
  describe "New Employee page", :type => :feature do
    before :each do
      5.times do
        create(:employee_with_apprentices)
      end
      visit '/employees/new'
    end

    scenario "Check breadcrumbs work" do
      has_content?('Employee')
      find("a[href='/?tab=1").click
      expect(page).to have_current_path("/?tab=1")
    end

    scenario "Checks form does not submit if invalid, checks the correct fields are valid" do
      has_content?('Employee')
      click_button('Submit')
      expect(page).to have_selector('.invalid-feedback')
    end
    
    scenario "Creates a new employee a first and last name" do
      has_selector?("form")
      fill_in('fname', with: 'Employee')
      fill_in('lname', with: 'Test')
      click_button 'Submit'
      has_current_path?("/?tab=1")
      get_last = Employee.last
      expect(get_last.display_name).to eq("Employee Test")
    end

    scenario "Creates a new employee with a apprentice" do
      apprentice = Employee.first
      has_current_path?("/employees/new")
      find("form")
      has_content?("Employee")
      fill_in('fname', with: 'Apprentice')
      fill_in('lname', with: 'Test')
      click_button('Assign Apprentice')
      has_selector?(".apprentices0__control")
      find('.apprentices0__control').click
      find(".apprentices0__option", text: "#{apprentice.display_name}").click
      
      click_button('Submit')
      new_employee = Employee.find_by_fname("Apprentice")
      expect(new_employee.apprentices.map{|a| a.apprentice_id}).to eq([apprentice.id])
    end 
    
    scenario "Creates a new employee with an emergency contact" do
    end

  end
end

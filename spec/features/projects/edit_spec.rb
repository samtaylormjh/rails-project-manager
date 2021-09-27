require 'rails_helper'

RSpec.feature "Projects::Edit", type: :feature do
  describe "Edit Project page", :type => :feature do

    scenario "Loads the project and displays the fields correctly navigated by table button" do
      new_project = Project.create(number:1,name:'Display Test')
      new_project.site_supervisors.create(employee_id:emp1.id)
      visit '/?tab=2'
      find("a[href='/projects/#{new_project.id}/edit']").click
      has_current_path?("/projects/#{new_project.id}/edit")
      has_selector?("input[name='name']")
      expect(page).to have_field('name', with: 'Display Test')
    end

    scenario "Loads the project and display the fields correctly navigated by url" do
    end

    scenario "Can update the name of an existing project" do
      new_project = Project.create(number:3,name:'Edit Test')
      visit '/?tab=2'
      find("a[href='/projects/#{new_project.id}/edit']").click
      has_current_path?("/projects/#{new_project.id}/edit")
      has_selector?("form")
      fill_in('name', with: 'Updated name')
      click_button 'Submit'
      new_project = Project.last
      expect(page).to have_current_path("/?tab=2")
      expect(new_project.name).to eq("Updated name")
    end


    scenario "Adds a site supervisor from existing project" do
    end 

    scenario "Updates a site supervisor in an existing project" do
      # Create some employees and projects
      emp1 = Employee.create(fname:"1Test",lname:"1Employee")
      emp2 = Employee.create(fname:"2Test",lname:"2Employee")
      project_to_change = Project.create(number:3,name:'ss test',site_supervisors_attributes:[employee_id: emp1.id])
      visit '/?tab=2'

      find("a[href='/projects/#{project_to_change.id}/edit']").click
      has_current_path?("/projects/#{project_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".site_supervisors__control")
      
      find('.site_supervisors__control').click
      find(".site_supervisors__option", text: emp2.display_name).click
      click_button('Submit')
      
      # Checks the original project has been updated
      project_after_change = Project.find(project_to_change.id)
      expect(project_after_change.site_supervisors.first.employee_id).to eq(emp2.id)
    end

    scenario "Removes a site supervisor from existing project" do
    end

    scenario "Adds/Updates and Removes a site supervisor from existing project" do
    end


end
end

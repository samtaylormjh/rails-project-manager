require 'rails_helper'

RSpec.feature "Projects::Edit", type: :feature do
  describe "Edit Project page", :type => :feature do
    before :each do
      5.times do
        create(:project_with_ss)
      end
      visit '/?tab=2'
    end

    scenario "Loads the project and displays the fields correctly navigated by table button" do
      new_project = Project.last
      find("a[href='/projects/#{new_project.id}/edit']").click
      has_current_path?("/projects/#{new_project.id}/edit")
      has_selector?("input[name='name']")
      expect(page).to have_field('name', with: "#{new_project.name}")
    end

    scenario "Loads the project and display the fields correctly navigated by url" do
      new_project = Project.last
      visit "/projects/#{new_project.id}/edit"
      has_selector?("input[name='name']")
      expect(page).to have_field('name', with: "#{new_project.name}")
    end

    scenario "Can update the name of an existing project" do
      new_project = Project.last
      find("a[href='/projects/#{new_project.id}/edit']").click
      has_current_path?("/projects/#{new_project.id}/edit")
      has_selector?("form")
      fill_in('name', with: 'Updated name')
      click_button 'Submit'
      # Update new_project
      updated_project = Project.find(new_project.id)
      expect(page).to have_current_path("/?tab=2")
      expect(updated_project.name).to eq("Updated name")
    end


    scenario "Adds a site supervisor from existing project" do
      project_to_add_ss = Project.last
      find("a[href='/projects/#{project_to_add_ss.id}/edit']").click
      has_current_path?("/projects/#{project_to_add_ss.id}/edit")
      has_selector?("form")
      click_button('Add New Site Supervisor +')
      has_selector?(".site_supervisors2__control")
      find('.site_supervisors2__control').click
      find(".site_supervisors2__option", text: Employee.first.display_name).click
      click_button('Submit')
      project_with_new_ss = Project.find(project_to_add_ss.id)
      expect(project_with_new_ss.site_supervisors.map{|ss| ss.employee_id}).to include(Employee.first.id)
    end 

    scenario "Updates a site supervisor in an existing project" do
      project_to_change = Project.last
      find("a[href='/projects/#{project_to_change.id}/edit']").click
      has_current_path?("/projects/#{project_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".site_supervisors0__control")
      
      find('.site_supervisors0__control').click
      find(".site_supervisors0__option", text: Employee.first.display_name).click
      click_button('Submit')
      
      # Checks the original project has been updated
      project_after_change = Project.find(project_to_change.id)
      expect(project_after_change.site_supervisors.first.employee_id).to eq(Employee.first.id)
    end

    scenario "Removes a site supervisor from existing project" do
      project_to_change = Project.last
      initial_ss_count = project_to_change.site_supervisors.count
      find("a[href='/projects/#{project_to_change.id}/edit']").click
      has_current_path?("/projects/#{project_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".site_supervisors0__control")
      find('#delete_0').click
      click_button('Submit')
      project_after_change = Project.find(project_to_change.id)
      expect(project_after_change.site_supervisors.count).to eq(initial_ss_count-1)
    end

    scenario "Adds/Updates and Removes a site supervisor from existing project" do
      project_to_change = Project.last
      initial_ss_count = project_to_change.site_supervisors.count

      ss_to_remove = project_to_change.site_supervisors.first
      ss_to_update = project_to_change.site_supervisors.second
      emp_ss_to_create = create(:employee)

      find("a[href='/projects/#{project_to_change.id}/edit']").click
      has_current_path?("/projects/#{project_to_change.id}/edit")
      has_selector?("form")
      has_selector?(".site_supervisors0__control")
      # Delete the first ss
      find("#delete_0").click

      # Add Employee.first as a new ss
      click_button('Add New Site Supervisor +')
      find('.site_supervisors2__control').click
      find(".site_supervisors2__option", text: emp_ss_to_create.display_name).click
      
      # Update the remaining initial ss 
      find('.site_supervisors0__control').click
      # doesnt scroll to find display name
      find(".site_supervisors0__option", text: ss_to_update.employee.display_name).click
      click_button('Submit')

      updated_project = Project.find(project_to_change.id)
      
      updated_ss = updated_project.site_supervisors.map{|ss|ss.employee_id}
      expect_ss_to_be = [ss_to_update.employee_id,emp_ss_to_create.id]

      expect(updated_ss).to eq(expect_ss_to_be)
    end
  end
end

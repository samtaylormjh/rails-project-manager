require 'rails_helper'

RSpec.feature "Projects::Indices", type: :feature do
  describe "Project Index page", :type => :feature do
    before :each do
      Project.create(number:1,name:'1')
      Project.create(number:2,name:'2')
      visit '/?tab=2'
    end

    # scenario "Lists all projects" do
    #     expect(page).to have_css("table tbody tr", :count=>Project.count)
    # end

    # scenario "Checks that the new project button routes to projects/new" do
    #   click_button('New Project')
    #   expect(page).to have_current_path("/projects/new")
    #   expect(page).to have_selector("form")
    #   expect(page).to have_content("Project")
    # end

    # scenario "Checks that the edit project button routes to the correct /edit page" do
    #   find("a[href='/projects/#{Project.last.id}/edit']").click
    #   expect(page).to have_current_path("/projects/#{Project.last.id}/edit")
    #   expect(page).to have_selector("form")
    #   expect(page).to have_content("Project")
    # end

    scenario "Creates a new project with a site supervisor" do
      emp = Employee.create(fname:"Test",lname:"Employee")
      click_button('New Project')
      # expect(page).to have_current_path("/projects/new")
      # expect(page).to have_selector("form")
      # expect(page).to have_content("Project")
      fill_in('name', with: 'Test Project')
      click_button('Add New Site Supervisor')
      find('.site_supervisors_select').click
      binding.pry
      # find_field(emp.display_name, :visible => :all).click
      # within(".site_supervisors_select") do
        # find(".Select-option", text: "Test Employee").click
      # end
      click_button('Submit')
      new_project = Project.find_by_name("Test Project")
      expect(new_project.name).to eq("Test Project")
    end  

    # scenario "Creates then deletes a project" do
    #   click_button('New Project')
    #   expect(page).to have_current_path("/projects/new")
    #   expect(page).to have_selector("form")
    #   expect(page).to have_content("Project")
    #   fill_in('name', with: 'Test Project')
    #   click_button('Submit')
      
    #   new_project = Project.find_by_name("Test Project")
    #   expect(new_project.name).to eq("Test Project")
    # end

    # scenario "Adds a new note to project" do
    #   project_to_edit = Project.find(1)
    #   find(id: "popover#{project_to_edit.id}").click
    #   fill_in('notes', with: 'Some notes')
    #   click_button("Add Note +")
    #   expect(page).to_not have_selector("textarea[name='notes']")

    #   project_updated = Project.find(project_to_edit.id)
    #   expect(project_updated.notes).to eq("Some notes")
    # end

  end
end

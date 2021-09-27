require 'rails_helper'

RSpec.feature "Projects::New", type: :feature do
  describe "New Project page", :type => :feature do
    before :each do
      Project.create(number:1,name:'1')
      Project.create(number:2,name:'2')
      visit '/projects/new'
    end

    scenario "Check breadcrumbs work" do
      has_content?('Project')
      find("a[href='/?tab=2").click
      expect(page).to have_current_path("/?tab=2")
    end

    scenario "Checks form does not submit if invalid, checks the correct fields are valid" do
      has_content?('Project')
      click_button('Submit')
      expect(page).to have_selector('.invalid-feedback')
    end
    
    scenario "Creates a new project with all fields" do
      expect(page).to have_selector("form")
      fill_in('name', with: 'Project Test')
      click_button 'Submit'
      expect(page).to have_current_path("/?tab=2")
      get_last = Project.last
      expect(get_last.name).to eq("Project Test")
    end

    scenario "Creates a new project with a site supervisor" do
      emp = Employee.create(fname:"Test",lname:"Employee")
      has_current_path?("/projects/new")
      find("form")
      has_content?("Project")
      fill_in('name', with: 'Test Project')
      click_button('Add New Site Supervisor')
      has_selector?(".site_supervisors__control")
      find('.site_supervisors__control').click
      find(".site_supervisors__option", text: "Test Employee").click
      
      click_button('Submit')
      new_project = Project.find_by_name("Test Project")
      expect(new_project.site_supervisors.ids).to eq([emp.id])
    end  

  end
end

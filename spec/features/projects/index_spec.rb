require 'rails_helper'

RSpec.feature "Projects::Indices", type: :feature do
  describe "Project Index page", :type => :feature do
    before :each do
      1000.times do
        create(:project)
      end
      visit '/?tab=2'
    end

    scenario "Lists all projects" do
      expect(page).to have_css("table tbody tr", :count=>Project.count)
    end

    scenario "Displays a project correctly" do
      emp = Employee.create(fname:'Test',lname:'Employee')
      project_to_check = Project.create(number:3,name:'Display test',site_supervisors_attributes:[employee_id: emp.id])
      visit '?tab=2'
      expect(page).to have_css("table tbody tr", :count=>Project.count)
      project_name = find("table tbody tr:nth-child(3) td:nth-child(1)").text
      project_site_supervisor = find("table tbody tr:nth-child(3) td:nth-child(2)").text
      project_id = find("table tbody tr:nth-child(3) td:nth-child(3)").text
      expect(project_name).to eq(project_to_check.name)
      expect(project_site_supervisor).to eq(project_to_check.site_supervisors.map{|ss| ss.employee.display_name}.join(" "))
      expect(project_id).to eq(project_to_check.id.to_s)
    end

    scenario "Checks that the new project button routes to projects/new" do
      click_button('New Project')
      expect(page).to have_current_path("/projects/new")
      expect(page).to have_selector("form")
      expect(page).to have_content("Project")
    end

    scenario "Checks that the edit project button routes to the correct /edit page" do
      find("a[href='/projects/#{Project.last.id}/edit']").click
      expect(page).to have_current_path("/projects/#{Project.last.id}/edit")
      expect(page).to have_selector("form")
      expect(page).to have_content("Project")
    end

    scenario "Creates then deletes a project" do
      click_button('New Project')
      has_current_path?("/projects/new")
      has_selector?("form")
      has_content?("Project")
      fill_in('name', with: 'Test Project')
      click_button('Submit')
      
      new_project = Project.find_by_name("Test Project")
      expect(new_project.name).to eq("Test Project")
      click_button(id: "#{new_project.id}.delete")
      expect(page).to_not have_selector("button[id='#{new_project.id}.delete']")
      expect(Project.count).to eq(2)
    end

    scenario "Adds a new note to project" do
      project_to_edit = Project.find(1)
      find(id: "popover#{project_to_edit.id}").click
      fill_in('notes', with: 'Some notes')
      click_button("Add Note +")
      expect(page).to_not have_selector("textarea[name='notes']")

      project_updated = Project.find(project_to_edit.id)
      expect(project_updated.notes).to eq("Some notes")
    end

    scenario "Notes display correctly" do
      project_to_check = Project.create(number: 4,name: 'notes test',notes:'some notes')
      visit '/?tab=2'
      find("#popover#{project_to_check.id}").click
      has_selector?("textarea[name='notes']")
      expect(page).to have_field('notes', with: 'some notes')
    end

  end
end

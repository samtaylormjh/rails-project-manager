require 'rails_helper'

RSpec.feature "Projects::Indices", type: :feature do
  describe "Project Index page", :type => :feature do
    before :each do
      Project.create(number:1,name:'1')
      Project.create(number:2,name:'2')
      visit '/?tab=2'
    end

    scenario "Lists all projects" do
        expect(page).to have_css("table tbody tr", :count=>Project.count)
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

    scenario "Adds a new note to project" do
      project_to_edit = Project.find(1)
      find(id: "popover#{project_to_edit.id}").click
      fill_in('notes', with: 'Some notes')
      click_button("Add Note +")
      project_updated = Project.find(project_to_edit.id)
      expect(project_updated.notes).to eq("Some notes")
    end

  end
end

require 'rails_helper'

RSpec.feature "Projects::Indices", type: :feature do
  describe "Project Index page", :type => :feature do
    before :each do
      5.times do
        create(:project_with_ss)
      end
      visit '/?tab=2'
    end

    scenario "Lists all projects" do
      expect(page).to have_css("table tbody tr", :count=>Project.count)
    end

    scenario "Displays a project correctly" do
      project_to_check = create(:project_with_ss)
      visit '?tab=2'
      has_css?("table tbody tr", :count=>Project.count)
      project_name = find("table tbody tr:nth-child(#{project_to_check.id}) td:nth-child(1)").text
      project_site_supervisor = find("table tbody tr:nth-child(#{project_to_check.id}) td:nth-child(2)").text
      project_id = find("table tbody tr:nth-child(#{project_to_check.id}) td:nth-child(3)").text
      expect(project_name).to eq(project_to_check.name)
      expect(project_site_supervisor).to eq(project_to_check.site_supervisors.map{|ss| ss.employee.display_name}.to_sentence)
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

    scenario "Can delete a project" do
      initial_projects_count = Project.count
      project_to_remove = Project.last
      click_button(id: "#{project_to_remove.id}.delete")
      expect(page).to_not have_selector("button[id='#{project_to_remove.id}.delete']")
      expect(Project.count).to eq(initial_projects_count-1)
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
      project_to_check = Project.create(number: 7,name: 'notes test',notes:'some notes')
      visit '/?tab=2'
      find("#popover#{project_to_check.id}").click
      has_selector?("textarea[name='notes']")
      expect(page).to have_field('notes', with: 'some notes')
    end

  end
end

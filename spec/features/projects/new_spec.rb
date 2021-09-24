require 'rails_helper'

RSpec.feature "Projects::New", type: :feature do
  scenario "Fills out and submits the new Project form" do
    visit '/projects/new'
    expect(page).to have_selector("form")
    fill_in('name', with: 'Project Test')
    click_button 'Submit'
    expect(page).to have_current_path("/?tab=2")
    get_last = Project.last
    expect(get_last.name).to eq("Project Test")
  end
end

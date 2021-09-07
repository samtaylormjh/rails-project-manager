json.array! @employees.each do |employee|
  json.id employee.id
  json.fname employee.fname
  json.lname employee.lname
  json.display_name employee.display_name

  json.projects employee.projects.each do |employee_project|
    json.project_id employee_project.project_id
    json.name employee_project.project.name
  end
end
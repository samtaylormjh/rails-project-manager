json.array! @employees.each do |employee|
  json.id employee.id
  json.fname employee.fname
  json.lname employee.lname
  json.display_name employee.display_name
end
json.array! @employees.each do |employee|
  json.id employee.id
  json.fname employee.fname
  json.lname employee.lname
  json.project employee.project
end
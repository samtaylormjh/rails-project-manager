json.id employee.id
json.fname employee.fname
json.lname employee.lname
json.display_name employee.display_name

json.projects employee.projects

json.emergency_contacts_attributes employee.emergency_contacts.each do |ec|
  json.id ec.id
  json.employee_id ec.employee_id
  json.fname ec.fname
  json.lname ec.lname
  json.number ec.number
  json.primary ec.primary
end

list_of_apprentices = employee.apprentices.select do |a|
  if a.apprentice_employee.present?
    a
  end
end

json.list_of_apprentices list_of_apprentices.map{|a|a.apprentice_employee.display_name}.to_sentence


json.apprentices_attributes employee.apprentices.each do |a|
  json.id a.id
  json.employee_id a.employee_id
  json.apprentice_id a.apprentice_id
end
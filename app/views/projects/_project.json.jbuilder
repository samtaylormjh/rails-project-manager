json.id project.id
json.name project.name
json.site_supervisors project.site_supervisors.each do |ss|
  json.id ss.id
  json.employee_id ss.employee_id
  # json.employee_fname ss.employee_fname
  # json.employee_lname ss.employee_lname
end

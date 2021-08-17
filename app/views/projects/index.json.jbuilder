json.array! @projects.each do |project|
  json.id project.id
  json.name project.name
end
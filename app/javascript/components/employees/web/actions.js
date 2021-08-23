import axios from "axios"

export const GET_EMPLOYEES = "GET_EMPLOYEES"
export const getEmployees = () => {
  const request = axios.get("http://localhost:3000/employees.json")
  return {
    type: GET_EMPLOYEES,
    payload: request,
  }
}

export const ADD_EMPLOYEES = "ADD_EMPLOYEES"
export const addEmployee = (employee) => {
  const request = axios.post("http://localhost:3000/employees.json", {
    employee,
  })
  return {
    type: ADD_EMPLOYEES,
    payload: request,
  }
}

export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE"
export const deleteEmployee = (id) => {
  const request = axios.delete(`/employees/${id}.json`)
  return {
    type: DELETE_EMPLOYEE,
    payload: request,
  }
}

export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE"
export const updateEmployee = (employee) => {
  const request = axios.put(`/employees/${employee.id}.json`, {
    fname: employee.fname,
    lname: employee.lname,
  })
  return {
    type: UPDATE_EMPLOYEE,
    payload: request,
  }
}

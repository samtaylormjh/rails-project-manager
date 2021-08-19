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

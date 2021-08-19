import { combineReducers } from "redux"
import projectsReducer from "../projects/web/reducers"
import employeesReducer from "../employees/web/reducers"

export default combineReducers({
  projects: projectsReducer,
  employees: employeesReducer,
})

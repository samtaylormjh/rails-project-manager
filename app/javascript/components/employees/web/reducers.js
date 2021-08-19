import { GET_EMPLOYEES, ADD_EMPLOYEES } from "./actions"

export default function employeesReducer(state = [], action) {
  switch (action.type) {
    case `${GET_EMPLOYEES}_FULFILLED`: {
      return action.payload.data
    }
    case `${ADD_EMPLOYEES}_FULFILLED`: {
      const newState = [...state]
      return newState
    }
    default:
      return state
  }
}

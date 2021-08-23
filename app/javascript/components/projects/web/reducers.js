import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "./actions"

export default function projectsReducer(state = [], action) {
  switch (action.type) {
    case `${GET_PROJECTS}_FULFILLED`: {
      return action.payload.data
    }
    case `${ADD_PROJECT}_FULFILLED`: {
      const newState = [...state]
      return newState
    }
    case `${DELETE_PROJECT}_FULFILLED`: {
      let newState = [...state]
      const id = action.payload.data.id
      newState = newState.filter((p) => p.id != id)
      return newState
    }
    case `${UPDATE_PROJECT}_FULFILLED`: {
      let newState = [...state]
      const indexToUpdate = newState.findIndex(
        (p) => p.id == action.payload.data.id
      )
      newState[indexToUpdate] = action.payload.data
      return newState
    }
    default:
      return state
  }
}

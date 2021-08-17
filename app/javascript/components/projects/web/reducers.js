import { GET_PROJECTS, ADD_PROJECT } from "./actions";

export default function projectsReducer(state = [], action) {
  switch (action.type) {
    case `${GET_PROJECTS}_FULFILLED`: {
      return action.payload.data;
    }
    case `${ADD_PROJECT}_FULFILLED`: {
      console.log(action.payload);
      const newState = [...state];
      return newState;
    }
    default:
      return state;
  }
}

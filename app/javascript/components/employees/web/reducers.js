import {
  GET_EMPLOYEES,
  ADD_EMPLOYEES,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "./actions";

export default function employeesReducer(state = [], action) {
  switch (action.type) {
    case `${GET_EMPLOYEES}_FULFILLED`: {
      return action.payload.data;
    }
    case `${ADD_EMPLOYEES}_FULFILLED`: {
      let newEmployeeData = action.payload.data;

      const newState = [...state, newEmployeeData];

      console.log(newState);
      return newState;
    }
    case `${DELETE_EMPLOYEE}_FULFILLED`: {
      let newState = [...state];
      const id = action.payload.data.id;
      console.log(newState, id);
      newState = newState.filter((e) => e.id != id);
      return newState;
    }
    case `${UPDATE_EMPLOYEE}_FULFILLED`: {
      let newState = [...state];
      const indexToUpdate = newState.findIndex(
        (e) => e.id == action.payload.data.id
      );
      newState[indexToUpdate] = action.payload.data;
      return newState;
    }
    default:
      return state;
  }
}

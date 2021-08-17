import { combineReducers } from "redux";
import projectsReducer from "../projects/web/reducers";

export default combineReducers({ projects: projectsReducer });

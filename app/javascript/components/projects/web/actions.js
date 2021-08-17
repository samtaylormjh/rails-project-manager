import axios from "axios";

export const GET_PROJECTS = "GET_PROJECTS";
export const getProjects = () => {
  const request = axios.get("http://localhost:3000/projects.json");
  return {
    type: GET_PROJECTS,
    payload: request,
  };
};

export const ADD_PROJECT = "ADD_PROJECT";
export const addProject = (project) => {
  const request = axios.post("http://localhost:3000/projects.json", {
    project,
  });
  return {
    type: ADD_PROJECT,
    payload: request,
  };
};

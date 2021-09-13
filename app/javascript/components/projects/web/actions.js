import axios from "axios";

export const GET_PROJECTS = "GET_PROJECTS";
export const getProjects = () => {
  const request = axios.get("/projects.json");
  return {
    type: GET_PROJECTS,
    payload: request,
  };
};

export const ADD_PROJECT = "ADD_PROJECT";
export const addProject = (project) => {
  const request = axios.post("/projects.json", {
    project,
  });
  return {
    type: ADD_PROJECT,
    payload: request,
  };
};

export const DELETE_PROJECT = "DELETE_PROJECT";
export const deleteProject = (id) => {
  const request = axios.delete(`/projects/${id}.json`);
  return {
    type: DELETE_PROJECT,
    payload: request,
  };
};

export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const updateProject = (project) => {
  // console.log(project);
  const request = axios.put(`/projects/${project.id}.json`, project);
  return {
    type: UPDATE_PROJECT,
    payload: request,
  };
};

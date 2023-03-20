import { toast } from "react-toastify";
import ProjectApi from "../../API/ProjectApi";
import { projectAction, domainDataAction } from "../AppReducer";

const projectApi = new ProjectApi();

export const fetchProjectList = () => {
  return async (dispatch, getState) => {
    await projectApi.getProjectList().then((response) => {
      dispatch(
        domainDataAction.setProjectId(response.data.data.projects[0]._id)
      );
      return dispatch(projectAction.setProjectList(response.data.data));
    });
  };
};

export const addProduct = (payload) => {
  return async (dispatch, getState) => {
    await projectApi.addProject(payload).then((response) => {
      response &&
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return dispatch(projectAction.setProjectList(response.data.data));
    });
  };
};

export const deleteProject = (id) => {
  return async (dispatch, getState) => {
    await projectApi.deleteProject(id).then((response) => {
      response &&
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return dispatch(projectAction.setProjectList(response.data.data));
    });
  };
};

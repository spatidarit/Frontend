import { toast } from "react-toastify";
import DashboardApi from "../../API/DashboardApi";
import ProjectApi from "../../API/ProjectApi";
import { employeeAction, managerActions } from "../AppReducer";

const dashboardApi = new DashboardApi();
const projectApi = new ProjectApi();

export const fetchEmpoloyees = (page) => {
  return async (dispatch, getState) => {
    const employeeReducer = getState().employeeReducer;
    const authReducer = getState().authReducer;
    const isAdmin = authReducer.role == "ADMIN";
    const managerId = isAdmin
      ? employeeReducer.managerId
      : localStorage.getItem("id");
    await dashboardApi
      .getAllEmployee(page, managerId, isAdmin)
      .then((response) => {
        return dispatch(employeeAction.employeesSave(response.data.data));
      });
  };
};

export const fetchManagers = () => {
  return async (dispatch, getState) => {
    await dashboardApi.getManagers().then((result) => {
      return dispatch(managerActions.managerSave(result.data.data));
    });
  };
};

export const deleteEmployeeAction = (user) => {
  return async (dispatch, getState) => {
    const authReducer = getState().authReducer;
    const isAdmin = authReducer.role == "ADMIN";
    return await dashboardApi.deleteEmployee(user, isAdmin).then((result) => {
      result &&
        toast(result.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return dispatch(fetchEmpoloyees(1, isAdmin));
    });
  };
};

export const deleteManagerAction = (user) => {
  return async (dispatch, getState) => {
    return await dashboardApi.deleteManager(user).then((result) => {
      result &&
        toast(result.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return dispatch(fetchManagers());
    });
  };
};

export const assignProject = (payload, role) => {
  return async (dispatch, getState) => {
    return await projectApi.assignProject(payload).then((result) => {
      result &&
        toast(result.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return role == "EMP"
        ? dispatch(fetchEmpoloyees(1))
        : dispatch(fetchManagers());
    });
  };
};

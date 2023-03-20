import axios from "axios";
import { toast } from "react-toastify";

class DashboardApi {
  getManagers = async () => {
    return await axios
      .get("http://localhost:3001/admin/all_managers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message.message);
      });
  };

  addEmployee = async (payload, isAdmin) => {
    let user = isAdmin ? "admin" : "manager";
    const url = "http://localhost:3001/" + user + "/add_employee";
    return await axios
      .post(url, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  addManager = async (payload) => {
    return await axios
      .post("http://localhost:3001/admin/add_manager", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  getAllEmployee = async (page, managerId, isAdmin) => {
    let user = isAdmin ? "admin" : "manager";
    let url =
      "http://localhost:3001/" +
      user +
      "/all_employees?page=" +
      page +
      "&size=1";
    if (managerId != "") {
      url = url + "&managerId=" + managerId;
    }
    return await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  deleteEmployee = async (payload, isAdmin) => {
    let user = isAdmin ? "admin" : "manager";
    let url = "http://localhost:3001/" + user + "/delete_employee";
    return await axios
      .delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
        data: payload,
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  deleteManager = async (payload) => {
    return await axios
      .delete("http://localhost:3001/admin/delete_manager", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
        data: payload,
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
}

export default DashboardApi;

import { toast } from "react-toastify";
import axios from "axios";

class ProjectApi {
  getProjectList = async () => {
    const url =
      "http://localhost:3001/project/project-list?id=" +
      localStorage.getItem("id");
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

  addProject = async (payload) => {
    return await axios
      .post("http://localhost:3001/project/new-project", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  deleteProject = async (id) => {
    return await axios
      .delete("http://localhost:3001/project/project-delete?id=" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  assignProject = async (payload) => {
    return await axios.post(
      "http://localhost:3001/project/assign-project",
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      }
    );
  };
}

export default ProjectApi;

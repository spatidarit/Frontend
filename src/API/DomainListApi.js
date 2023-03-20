import { toast } from "react-toastify";
import axios from "axios";

class DomainListApi {
  addDomains = async (payload) => {
    const url = "http://localhost:3001/domain/upload-csv";
    return await axios
      .post(url, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  getDomainList = async (projectId) => {
    const url =
      "http://localhost:3001/domain/domain-list?projectId=" + projectId;
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

  getProjectList = async () => {
    const url = "http://localhost:3001/project/project-list";
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

  updateDomainLinkData = async (payload, projectId) => {
    const url =
      "http://localhost:3001/domain/domain-link?projectId=" + projectId;
    return await axios
      .put(url, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
}

export default DomainListApi;

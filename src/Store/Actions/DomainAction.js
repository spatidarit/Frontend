import DomainListApi from "../../API/DomainListApi";
import { domainDataAction } from "../AppReducer";
import { toast } from "react-toastify";

const domainListApi = new DomainListApi();

export const fetchDomainList = (projectId) => {
  return async (dispatch, getState) => {
    await domainListApi.getDomainList(projectId).then((response) => {
      return dispatch(domainDataAction.setDomainList(response.data.data));
    });
  };
};



export const updateDomainLinkData = (linkData, domainData) => {
  return async (dispatch, getState) => {
    const projectId = getState().domainReducer.ProjectId;

    await domainListApi
      .updateDomainLinkData({ linkData, domainData }, projectId)
      .then((response) => {
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

        return dispatch(domainDataAction.setDomainList(response.data.data));
      });
  };
};

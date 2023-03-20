import classes from "./DomainDataList.module.css";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import DomianListButton from "../../ModelButton/DomainListButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchDomainList } from "../../../../Store/Actions/DomainAction";
import ModalButton from "../../../Button/ModalBotton";
import { domainDataAction } from "../../../../Store/AppReducer";

function DomainDataList({ isAdmin }) {
  const dispatch = useDispatch();
  const { reducer, domainList } = useSelector((state) => {
    return {
      reducer: state.domainReducer,
      domainList: state.domainReducer.domainList,
    };
  });
  const { projects } = useSelector((state) => ({
    projects: state.projectReducer.projectList,
  }));
  const [disableEditButton, setDisableEditButton] = useState(false);
  const fetchDomains = (id) => {
    dispatch(fetchDomainList(id));
  };
  useEffect(() => {
    fetchDomains(reducer.ProjectId);
  }, []);

  const disableEditButtonHandler = () => {
    setDisableEditButton(true);
  };
  const enableEditButtonHandler = () => {
    setDisableEditButton(false);
  };
  const handleProject = (event) => {
    dispatch(domainDataAction.setProjectId(event.target.value));
    fetchDomains(event.target.value);
  };
  return (
    <div className="card">
      <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
        Domain Data
      </h3>
      <div className="card-body">
        {isAdmin && <ModalButton id="domainModal" title="Upload Domains" />}
        <div className="d-flex justify-content-end">
          <div className="d-inline-flex p-2 mb-2 bd-highlight">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleProject}
            >
              {projects.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.projectName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div
          id="table"
          className={classes["project-table"] + " table-editable"}
        >
          <table className="table table-bordered table-responsive-md table-striped text-center">
            <thead>
              <tr>
                <th className="text-center">Domain</th>
                <th className="text-center">DA</th>
                <th className="text-center">SS</th>
                <th className="text-center">Niche</th>
                <th className="text-center">Type</th>
                <th className="text-center">Country</th>
                <th className="text-center"> Follow / No follow</th>
                <th className="text-center">Paid/UnPaid</th>
                <th>Date</th>
                <th>Live Link</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domainList &&
                domainList.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      _id={item._id}
                      isAdmin={isAdmin}
                      disableEditButton={disableEditButton}
                      onDisableEditButton={disableEditButtonHandler}
                      onEnableEditButton={enableEditButtonHandler}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DomainDataList;

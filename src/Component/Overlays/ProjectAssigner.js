import React, { useState } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.css";
import DashboardApi from "../../API/DashboardApi";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";
import { assignProject } from "../../Store/Actions/DashboardActions";

const ProjectAssigner = ({ employeeToUpdate, exitsProject, modalId, role }) => {
  const dashboardApi = new DashboardApi();
  const dispatch = useDispatch();
  const [assignedProject, setAssignedProject] = useState();
  const { projects } = useSelector((state) => ({
    projects: state.projectReducer.projectList,
  }));
  const [options, setOptions] = useState(
    projects &&
      projects.map((item, index) => ({
        projectName: item.projectName,
        id: item._id,
        name: item.projectName,
      }))
  );
  useEffect(() => {
    setAssignedProject(exitsProject);
  }, []);
  const handelEditEmployee = async () => {
    const payload = {
      _id: employeeToUpdate._id,
    };
    if (assignedProject) {
      payload.projects = assignedProject;
    } else {
      payload.projects = exitsProject;
    }
    dispatch(assignProject(payload, role));
  };
  const handleSelected = (event) => {
    setAssignedProject(event);
  };
  const handleUnselected = (event) => {
    setAssignedProject(event);
  };
  const element = (
    <div
      className="modal fade"
      id={modalId}
      tabndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" align="center">
        <div className={"modal-content " + style.mod}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Employee
            </h5>
            <button
              type="button"
              className="btn text-warning"
              data-bs-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={"modal-body " + style.modBody}>
            <form>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className={"col-form-label " + style.modLabel}
                >
                  Projects:
                </label>
                <Multiselect
                  options={options}
                  displayValue="name"
                  selectedValues={exitsProject}
                  onRemove={handleUnselected}
                  onSelect={handleSelected}
                  style={{
                    option: {
                      color: "black",
                    },
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
              onClick={handelEditEmployee}
            >
              Edit Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(element, document.getElementById("overlays"));
};
export default ProjectAssigner;

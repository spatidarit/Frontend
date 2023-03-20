import React, { useState } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Store/Actions/ProjectAction";
import { useEffect } from "react";

const AddProject = ({ project, setProjectUpdate, btnTitle }) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState(
    project ? project.projectName : ""
  );
  const [projectCode, setProjectCode] = useState(
    project ? project.projectCode : ""
  );
  const [projectUrl, setProjectUrl] = useState(
    project ? project.projectUrl : ""
  );
  const [projectDetails, setProjectDetails] = useState(
    project ? project.projectDetails : ""
  );
  const [clientName, setClientName] = useState(
    project ? project.clientName : ""
  );
  const [companyName, setCompanyName] = useState(
    project ? project.companyName : ""
  );

  useEffect(() => {
    setProjectName(project ? project.projectName : "");
    setProjectCode(project ? project.projectCode : "");
    setProjectUrl(project ? project.projectUrl : "");
    setProjectDetails(project ? project.projectDetails : "");
    setClientName(project ? project.clientName : "");
    setCompanyName(project ? project.companyName : "");
  }, [project]);
  const handleProjectName = (event) => {
    setProjectName(event.target.value);
  };
  const handleProjectCode = (event) => {
    setProjectCode(event.target.value);
  };
  const handleProjectUrl = (event) => {
    setProjectUrl(event.target.value);
  };
  const handleProjectDetails = (event) => {
    setProjectDetails(event.target.value);
  };
  const handelCompanyName = (event) => {
    setCompanyName(event.target.value);
  };
  const handleClientName = (event) => {
    setClientName(event.target.value);
  };
  const handleAddProject = async () => {
    let payload = {
      projectName,
      projectCode,
      projectUrl,
      projectDetails,
      clientName,
      companyName,
    };
    if (project != null) {
      payload._id = project._id;
    }
    dispatch(addProduct(payload));
    setProjectUpdate(null);
    setClientName("");
    setCompanyName("");
    setProjectCode("");
    setProjectDetails("");
    setProjectName("");
    setProjectUrl("");
  };

  const element = (
    <div
      className="modal fade"
      id="projectModal"
      tabndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" align="center">
        <div className={"modal-content " + style.mod}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Product
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
                  Project Name:
                </label>
                <input
                  value={projectName}
                  type="text"
                  className="form-control"
                  id="recipient-projectName"
                  onChange={handleProjectName}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className={"col-form-label " + style.modLabel}
                >
                  Project Code:
                </label>
                <input
                  value={projectCode}
                  type="text"
                  className="form-control"
                  id="recipient-first"
                  onChange={handleProjectCode}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className={"col-form-label " + style.modLabel}
                >
                  Project Url:
                </label>
                <input
                  value={projectUrl}
                  type="text"
                  className="form-control"
                  id="recipient-last"
                  onChange={handleProjectUrl}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="message-text"
                  className={"col-form-label " + style.modLabel}
                >
                  Project Details
                </label>
                <input
                  value={projectDetails}
                  type="text"
                  className="form-control"
                  id="recipient-last"
                  onChange={handleProjectDetails}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="message-text"
                  className={"col-form-label " + style.modLabel}
                >
                  Client Name
                </label>
                <input
                  value={clientName}
                  type="text"
                  className="form-control"
                  id="recipient-last"
                  onChange={handleClientName}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="message-text"
                  className={"col-form-label " + style.modLabel}
                >
                  Company Name
                </label>
                <input
                  value={companyName}
                  type="text"
                  className="form-control"
                  id="recipient-last"
                  onChange={handelCompanyName}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
              onClick={handleAddProject}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(element, document.getElementById("overlays"));
};
export default AddProject;

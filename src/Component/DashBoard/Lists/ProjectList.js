import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../../Store/Actions/ProjectAction";
import ModalButton from "../../Button/ModalBotton";
import AddProject from "../../Overlays/AddProject";
import DeleteModal from "../../Overlays/DeleteModal";

const ProjectList = () => {
  const { projects, role } = useSelector((state) => ({
    projects: state.projectReducer.projectList,
    role: state.authReducer.role,
  }));
  const [isAdminOrManager, setIsAdminOrMananger] = useState(
    role == "ADMIN" || role == "MNG"
  );
  const [isAdmin, setIsAdmin] = useState(role == "ADMIN");
  const [projectUpdate, setProjectUpdate] = useState(null);
  const dispatch = useDispatch();
  const handleDelete = (confirm) => {
    let projectId = localStorage.getItem("projectIdToDelete");
    if (confirm) dispatch(deleteProject(projectId));
    localStorage.removeItem("projectIdToDelete");
  };
  const toDelete = (id) => {
    localStorage.setItem("projectIdToDelete", id);
  };

  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <DeleteModal
        id="projectDelete"
        title="Delete Project"
        message="Are you sure !"
        handleDelete={handleDelete}
      />
      <AddProject project={projectUpdate} setProjectUpdate={setProjectUpdate} />
      <div className="container ">
        <div className="row flex-lg-nowrap">
          <div className="col mb-3">
            <div className="e-panel card">
              <div className="card-body">
                <div className="card-title">
                  <h6 className="mr-2">
                    <span></span>
                    <small className="px-1">
                      {isAdmin && (
                        <ModalButton
                          id="projectModal"
                          title="Add Producet"
                          action={setProjectUpdate}
                        />
                      )}
                    </small>
                  </h6>
                </div>
                <div className="e-table">
                  <div className="table-responsive table-lg mt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="max-width">Project Name</th>
                          <th className="sortable">Project code</th>
                          <th>Project url</th>
                          <th> Project details</th>
                          <th>Client Name</th>
                          <th>Company Name</th>
                          {isAdminOrManager && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-nowrap align-middle">
                                {item.projectName}
                              </td>
                              <td className="text-nowrap align-middle">
                                <span>{item.projectCode}</span>
                              </td>
                              <td className="text-center align-middle">
                                <span>{item.projectUrl}</span>
                              </td>
                              <td className="text-center align-middle">
                                <span>{item.projectDetails}</span>
                              </td>
                              <td className="text-center align-middle">
                                <span>{item.clientName}</span>
                              </td>
                              <td className="text-center align-middle">
                                <span>{item.companyName}</span>
                              </td>
                              {isAdminOrManager && (
                                <td className="text-center align-middle">
                                  <div className="btn-group align-top">
                                    <button
                                      className="btn btn-sm btn-outline-secondary "
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#projectModal"
                                      onClick={() => {
                                        setProjectUpdate(item);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-secondary "
                                      type="button"
                                      onClick={() => {
                                        toDelete(item._id);
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#projectDelete"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectList;

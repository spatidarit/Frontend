import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchEmployeeArticlesInfo } from "../../../Store/Actions/ArticleAction";
import {
  deleteEmployeeAction,
  fetchEmpoloyees,
} from "../../../Store/Actions/DashboardActions";
import { savedArticleAction } from "../../../Store/AppReducer";
import DeleteModal from "../../Overlays/DeleteModal";
import ProjectAssigner from "../../Overlays/ProjectAssigner";

const EmployeeList = () => {
  const { managers, dispatch, isAdmin } = useOutletContext();
  const [page, setPage] = useState(1);
  const [employee, selectEmployee] = useState();
  const [exitsProject, setExitsProject] = useState();
  const navigate = useNavigate();
  const { employees, totalEmployeePage, role, managerId } = useSelector(
    (state) => ({
      employees: state.employeeReducer.employees,
      totalEmployeePage: state.employeeReducer.totalEmployeePage,
      role: state.authReducer.role,
      managerId: state.authReducer.managerId,
    })
  );
  useEffect(() => {
    if (managerId == null) dispatch(fetchEmpoloyees(1, isAdmin));
  }, []);
  const isAdminOrManager = role == "ADMIN" || role == "MNG";
  const rightPage = () => {
    if (page < totalEmployeePage) {
      setPage((pre) => {
        return pre + 1;
      });

      dispatch(fetchEmpoloyees(page + 1));
    }
  };
  const leftPage = () => {
    if (page > 1) {
      setPage((pre) => {
        return pre - 1;
      });
      dispatch(fetchEmpoloyees(page - 1));
    }
  };

  const getManager = (managerId) => {
    const result = managers.filter((item) => item._id == managerId);
    return result.length > 0
      ? result[0].firstName + " " + result[0].lastName
      : "";
  };

  const handleDelete = (confirm) => {
    let user = localStorage.getItem("employeeIdToDelete");
    if (confirm) dispatch(deleteEmployeeAction(JSON.parse(user)));
    localStorage.removeItem("employeeIdToDelete");
  };
  const deleteEmployee = (user) => {
    localStorage.setItem("employeeIdToDelete", JSON.stringify(user));
  };

  const goToArticles = (id) => {
    dispatch(savedArticleAction.setUserId(id));
    dispatch(fetchEmployeeArticlesInfo(1));
    navigate("/dashboard/saved_articles");
  };

  const handleEdit = (element) => {
    if (element != null && element.projects != null) {
      setExitsProject(
        element.projects.map((item, index) => ({
          projectName: item.projectName,
          name: item.projectName,
          id: item.id,
        }))
      );
    }
  };
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <DeleteModal
        id="employeeDelete"
        title="Delete Employee"
        message="Are you sure !"
        handleDelete={handleDelete}
      />
      <ProjectAssigner
        employeeToUpdate={employee}
        exitsProject={exitsProject}
        setExitsProject={setExitsProject}
        modalId="EmployeeProjectAssign"
        role="EMP"
      />
      <div className="container ">
        <div className="row flex-lg-nowrap">
          <div className="col mb-3">
            <div className="e-panel card">
              <div className="card-body">
                <div className="card-title">
                  <h6 className="mr-2">
                    <span>Users</span>
                    <small className="px-1">Be a wise leader</small>
                  </h6>
                </div>
                <div className="e-table">
                  <div className="table-responsive table-lg mt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th className="max-width">userId</th>
                          <th className="sortable">Name</th>
                          {isAdmin && <th> Manager</th>}
                          {isAdminOrManager && (
                            <th className="sortable"> Actions</th>
                          )}
                          <th> Articles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle text-center">
                                <div className="bg-light d-inline-flex justify-content-center align-items-center align-top"></div>
                              </td>
                              <td className="text-nowrap align-middle">
                                {item.username}
                              </td>
                              <td className="text-nowrap align-middle">
                                <span>
                                  {item.firstName + " " + item.lastName}
                                </span>
                              </td>
                              {isAdmin && (
                                <td className="text-center align-middle">
                                  <span>{getManager(item.managerId)}</span>
                                </td>
                              )}
                              <td className="text-center align-middle">
                                <div className="btn-group align-top">
                                  <button
                                    className="btn btn-sm btn-outline-secondary "
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#EmployeeProjectAssign"
                                    onClick={() => {
                                      selectEmployee(item);
                                      handleEdit(item);
                                    }}
                                  >
                                    Project
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-secondary "
                                    type="button"
                                    onClick={() => {
                                      deleteEmployee(item);
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#employeeDelete"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                <button
                                  className="btn btn-sm btn-outline-secondary "
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#user-form-modal"
                                  onClick={() => {
                                    goToArticles(item._id);
                                  }}
                                >
                                  Articles
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-center">
                    <ul className="pagination mt-3 mb-0">
                      <li className=" page-item">
                        <a onClick={leftPage} className="page-link">
                          ‹
                        </a>
                      </li>
                      <li className="active page-item">
                        <a className="page-link">{page}</a>
                      </li>

                      <li className="page-item">
                        <a onClick={rightPage} className="page-link">
                          ›
                        </a>
                      </li>
                    </ul>
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
export default EmployeeList;

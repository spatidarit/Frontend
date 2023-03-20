import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import design from "./manager.module.css";
import { useNavigate } from "react-router-dom";
import { employeeAction, savedArticleAction } from "../../../Store/AppReducer";
import {
  deleteManagerAction,
  fetchEmpoloyees,
  fetchManagers,
} from "../../../Store/Actions/DashboardActions";
import { fetchEmployeeArticlesInfo } from "../../../Store/Actions/ArticleAction";
import ProjectAssigner from "../../Overlays/ProjectAssigner";
import { useState } from "react";

const ManagerList = () => {
  const { managers, dispatch } = useOutletContext();
  const navigate = useNavigate();
  const [manager, selectMananger] = useState();
  const [exitsProject, setExitsProject] = useState();
  useEffect(()=>{
    dispatch(fetchManagers());
  },[])
  const employees = (managerId) => {
    dispatch(employeeAction.saveManagerId(managerId));
    dispatch(fetchEmpoloyees(1));
    navigate("/dashboard/employee_list");
  };
  
  const deleteManager = (user) => {
    dispatch(deleteManagerAction(user));
  };

  const goToArticles = (id) => {
    dispatch(savedArticleAction.setUserId(id));
    dispatch(fetchEmployeeArticlesInfo(1));
    navigate("/dashboard/saved_articles");
  };

  const handleProject = (element) => {
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
    <React.Fragment>
      <ProjectAssigner
        employeeToUpdate={manager}
        exitsProject={exitsProject}
        setExitsProject={setExitsProject}
        modalId="ManagerProjectAssign"
        role="MNG"
      />
      <div className="container ">
        <div className={design.mainBody}>
          <div className={"row   " + design.guttersSm + " "}>
            {managers.map((item, index) => {
              return (
                <div
                  className={
                    design.col + " col-md-6 col-lg-4 col-sm-12 " + design.mb3
                  }
                  key={index}
                >
                  <div className={design.card}>
                    {/* <img
                      src="https://www.bootdey.com/image/340x120/00296B/000000"
                      alt="Cover"
                      className="card-img-top"
                    /> */}
                    <div className={design.cardBody + " text-center"}>
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        style={{ width: "100px", marginTop: "-65px" }}
                        alt="User"
                        className={
                          "img-fluid img-thumbnail rounded-circle border-0 " +
                          design.mb3
                        }
                      />
                      <h5 className="card-title">
                        {item.firstName + " " + item.lastName}
                      </h5>
                      <p
                        align="center"
                        className={
                          "text-secondary mb-1 block-container " +
                          design.username
                        }
                      >
                        <span title={item.username}>{item.username}</span>
                      </p>

                      <p className="text-muted font-size-sm">Manager</p>
                      <button
                        className={
                          "btn  btn-sm  has-icon  " +
                          design.bgWhite +
                          " " +
                          design.btnLight
                        }
                        type="button"
                        onClick={() => {
                          goToArticles(item._id);
                        }}
                      >
                        <i className="material-icons">Articles</i>
                      </button>
                      <button
                        className={
                          "btn  btn-sm  has-icon  " +
                          design.bgWhite +
                          " " +
                          design.btnLight
                        }
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#ManagerProjectAssign"
                        onClick={() => {
                          selectMananger(item);
                          handleProject(item);
                        }}
                      >
                        <i className="material-icons">Projects</i>
                      </button>
                    </div>
                    <div className={design.cardFooter}>
                      <button
                        className={
                          "btn  btn-sm  has-icon btn-block " +
                          design.bgWhite +
                          " " +
                          design.btnLight
                        }
                        type="button"
                        onClick={() => {
                          employees(item._id);
                        }}
                      >
                        <i className="material-icons">Employees</i>
                      </button>

                      <button
                        className={
                          "btn  btn-sm  has-icon  " +
                          design.bgWhite +
                          " " +
                          design.btnLight +
                          " " +
                          design.ml2
                        }
                        type="button"
                        onClick={() => {
                          deleteManager(item);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default connect((state) => state)(ManagerList);

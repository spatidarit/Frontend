import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardApi from "../../../API/DashboardApi";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchEmpoloyees } from "../../../Store/Actions/DashboardActions";
import {
  domainDataAction,
  employeeAction,
  savedArticleAction,
} from "../../../Store/AppReducer";
import { fetchDomainList } from "../../../Store/Actions/DomainAction";

const Sidebar = (props) => {
  const dashboardApi = new DashboardApi();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");
  const dispatch = useDispatch();
  const role = props.role;
  const isAdmin = role == "ADMIN";
  const goToHome = () => {
    navigate("/dashboard");
    setActive("home");
  };
  const reducer = useSelector((state) => state.domainReducer);
  const goToEmployeeList = () => {
    navigate("/dashboard/employee_list");
    if (isAdmin) dispatch(employeeAction.saveManagerId(0));
    dispatch(fetchEmpoloyees(1, isAdmin));
    setActive("employee_list");
  };
  const goToManagerList = () => {
    navigate("/dashboard/manager_list");
    setActive("manager_list");
  };
  const goToArticlesCreatore = () => {
    navigate("/dashboard/article_creator");
    setActive("article_creator");
  };

  const goToSavedArticles = () => {
    dispatch(savedArticleAction.setUserId(""));
    navigate("/dashboard/saved_articles");
    setActive("saved_articles");
  };

  const goToDomainList = () => {
    navigate("/dashboard/domain_list");
    setActive("domain_list");
  };

  const goToProductList = () => {
    navigate("/dashboard/project_list");
    setActive("project_list");
  };
  const employeListValidation = role == "ADMIN" || role == "MNG";
  const homeActive = splitLocation.length < 3 ? styles.active + "" : "";
  const managerListActive =
    "manager_list" === splitLocation[2] ? styles.active + "" : "";
  const employeeListActive =
    "employee_list" === splitLocation[2] ? styles.active + "" : "";
  const createArticleActive =
    "article_creator" === splitLocation[2] ? styles.active + "" : "";
  const savedArticleActive =
    "saved_articles" === splitLocation[2] ? styles.active + "" : "";
  const domainListActive =
    "domain_list" === splitLocation[2] ? styles.active + "" : "";
  const productListActive =
    "project_list" === splitLocation[2] ? styles.active + "" : "";
  return (
    <div id="mySidebar" className={styles.sidebar + " "}>
      <a onClick={goToHome} className={homeActive}>
        <i className="fa fa-home " aria-hidden="true"></i> My Dashboard
      </a>
      {isAdmin && (
        <a onClick={goToManagerList} className={managerListActive}>
          <i className="fa fa-list" aria-hidden="true"></i> Manager List
        </a>
      )}
      {employeListValidation && (
        <a onClick={goToEmployeeList} className={employeeListActive}>
          <i className="fa fa-users" aria-hidden="true"></i> Employee List
        </a>
      )}
      <a onClick={goToArticlesCreatore} className={createArticleActive}>
        <i className="fa fa-file" aria-hidden="true"></i> Artilce Creator
      </a>

      <a onClick={goToSavedArticles} className={savedArticleActive}>
        <i className="fa fa-folder-open" aria-hidden="true"></i> Saved Articles
      </a>

      <a onClick={goToDomainList} className={domainListActive}>
        <i className="fa fa-list" aria-hidden="true"></i> Domain List
      </a>

      <a onClick={goToProductList} className={productListActive}>
        <i className="fa fa-list" aria-hidden="true"></i> Product List
      </a>

      <a href="#"></a>
    </div>
  );
};
export default connect((state) => state)(Sidebar);

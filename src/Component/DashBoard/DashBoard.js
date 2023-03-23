import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import AdminDashboard from "./Admin/AdminDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import Nav from "./Nav/Nav";
import Sidebar from "./SideBar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDomainList } from "../../Store/Actions/DomainAction";
import { fetchProjectList } from "../../Store/Actions/ProjectAction";

const DashBoard = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjectList());
  }, []);
  const state = useSelector((state) => state.authReducer);
  const nav = <Nav setLogin={props.setLogin} />;
  if (props.isLogin) {
    switch (state.role) {
      case "ADMIN":
        return (
          <React.Fragment>
            {nav} <Sidebar role={state.role} />
            <AdminDashboard />
          </React.Fragment>
        );

      case "MNG":
        return (
          <React.Fragment>
            {nav}
            <Sidebar role={state.role} />
            <ManagerDashboard />
          </React.Fragment>
        );

      case "EMP":
        return (
          <React.Fragment>
            {nav}
            <Sidebar role={state.role} />
            <EmployeeDashboard />
          </React.Fragment>
        );
    }
  }
};
export default DashBoard;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchProjectList } from "../../../Store/Actions/ProjectAction";
import AddEmployee from "../../Overlays/AddEmployee";
import decor from "./style.module.css";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectList());
  }, []);

  return (
    <React.Fragment>
      <div className={decor.content} id="mainContent">
        <Outlet context={{ managers: [], dispatch, isAdmin: false }} />
      </div>
      <AddEmployee isAdmin={false} />
    </React.Fragment>
  );
};
export default EmployeeDashboard;

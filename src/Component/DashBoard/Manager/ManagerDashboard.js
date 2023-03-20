import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchManagers } from "../../../Store/Actions/DashboardActions";
import { fetchProjectList } from "../../../Store/Actions/ProjectAction";
import AddEmployee from "../../Overlays/AddEmployee";
import ModalButon from "../ModelButton/ModalButton";
import decor from "./style.module.css";

const ManagerDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectList());
  }, []);

  return (
    <React.Fragment>
      <ModalButon isAdmin={false} dispatch={dispatch} />
      <div className={decor.content} id="mainContent">
        <Outlet context={{ managers: [], dispatch, isAdmin: false }} />
      </div>
      <AddEmployee isAdmin={false} />
    </React.Fragment>
  );
};
export default ManagerDashboard;

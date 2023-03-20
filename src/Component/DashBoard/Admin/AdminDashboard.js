import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "../../Overlays/AddEmployee";
import ModalButon from "../ModelButton/ModalButton";
import { Outlet } from "react-router-dom";
import decor from "./style.module.css";
import { fetchManagers } from "../../../Store/Actions/DashboardActions";
import AddManager from "../../Overlays/AddManager";
import { fetchProjectList } from "../../../Store/Actions/ProjectAction";

const DashBoard = () => {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(fetchProjectList());
  }, []);

  return (
    <React.Fragment>
      <ModalButon isAdmin={true} dispatch={dispatch} />
      <div className={decor.content} id="mainContent">
        <Outlet
          context={{
            managers: reduxData.managerReducer.managers,
            dispatch,
            isAdmin: true,
          }}
        />
      </div>
      <AddEmployee
        isAdmin={true}
        managers={reduxData.managerReducer.managers}
      />
      <AddManager />
    </React.Fragment>
  );
};
export default DashBoard;

import React from "react";
import { fetchManagers } from "../../../Store/Actions/DashboardActions";
import decor from "./style.module.css";

const ModalButon = (props) => {
  return (
    <div className={"row " + decor.btnRow}>
      <div className="col">
        <button
          onClick={() => {
            props.dispatch(fetchManagers());
          }}
          type="button"
          className={"btn btn-warning text-dark " + decor.empBtn}
          data-bs-toggle="modal"
          data-bs-target="#employeeModal"
        >
          Add Employee
        </button>
        {props.isAdmin && (
          <button
            type="button"
            className={"btn btn-warning text-dark " + decor.empBtn}
            data-bs-toggle="modal"
            data-bs-target="#managerModal"
          >
            Add MANAGER
          </button>
        )}
      </div>
    </div>
  );
};
export default ModalButon;

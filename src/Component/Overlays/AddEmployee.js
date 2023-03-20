import React, { useState } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.css";
import { toast } from "react-toastify";
import DashboardApi from "../../API/DashboardApi";
import { useDispatch } from "react-redux";
import { fetchEmpoloyees } from "../../Store/Actions/DashboardActions";

const AddEmployee = (props) => {
  const dashboardApi = new DashboardApi();
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [managerId, setManagerId] = useState("Choose...");
  const isManagers = props.managers && props.managers.length > 0;
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);

    !props.isAdmin && setManagerId(localStorage.getItem("id"));
  };
  const handleManagerId = (event) => {
    setManagerId(event.target.value);
  };
  const handelAddEmployee = async () => {
    const payload = {
      username,
      firstName,
      lastName,
      managerId,
      role: "EMP",
    };

    const response = await dashboardApi.addEmployee(payload, props.isAdmin);
    if (response) {
      toast(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUserName("");
      setFirstName("");
      setLastName("");
      setManagerId("Choose...");
      dispatch(fetchEmpoloyees(1));
    }
  };

  const element = (
    <div
      className="modal fade"
      id="employeeModal"
      tabndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" align="center">
        <div className={"modal-content " + style.mod}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Employee
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
                  username:
                </label>
                <input
                  value={username}
                  type="text"
                  className="form-control"
                  id="recipient-username"
                  onChange={handleUserName}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className={"col-form-label " + style.modLabel}
                >
                  first name:
                </label>
                <input
                  value={firstName}
                  type="text"
                  className="form-control"
                  id="recipient-first"
                  onChange={handleFirstName}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className={"col-form-label " + style.modLabel}
                >
                  last name:
                </label>
                <input
                  value={lastName}
                  type="text"
                  className="form-control"
                  id="recipient-last"
                  onChange={handleLastName}
                />
              </div>
              {props.isAdmin && (
                <div className="form-group">
                  <label
                    htmlFor="message-text"
                    className={"col-form-label " + style.modLabel}
                  >
                    Manager:
                  </label>
                  <select
                    value={managerId}
                    id="inputState"
                    className="form-control"
                    onChange={handleManagerId}
                  >
                    <option>Choose...</option>
                    {isManagers &&
                      props.managers.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.firstName + " " + item.lastName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
              onClick={handelAddEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(element, document.getElementById("overlays"));
};
export default AddEmployee;

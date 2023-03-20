import React, { useEffect, useState } from "react";
import "../../../node_modules/mdb-ui-kit/css/mdb.min.css";
import { useLocation } from "react-router-dom";
import o_style from "./signin.module.css";
import SignApi from "../../API/SignApi";
import { toast } from "react-toastify";
import { SignLoader } from "../Overlays/Loader";
import bcrypt from "bcryptjs";

const SignIn = (props) => {
  const signApi = new SignApi();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loader, seLoader] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {}, [loader]);
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleSignInRequest = async (e) => {
    e.preventDefault();
    seLoader(true);
    const payload = {
      username: userName,
      password: bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u"),
      role: role,
    };
    try {
      const result = await signApi.signInApi(payload);
      seLoader(false);
      toast("Signed In!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("id", result.data.data.id);
      localStorage.setItem("auth_ac", result.data.data.auth_ac);
      props.setLogin(true);
      window.location.replace("/dashboard");
    } catch (err) {
      console.log(err);
      seLoader(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <SignLoader loading={loader} />
      <div className={"container " + o_style.mainDiv} align="center">
        <form>
          <div className="row mb-3 ">
            <div className="col ">
              <h2>Sign In</h2>
            </div>
          </div>
          <div className="row mb-3 ">
            <div className="col ">
              <input
                type="text"
                placeholder="username"
                className={"form-control border-0  " + o_style.bgcolor}
                onChange={handleUserName}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                placeholder="password"
                className={"form-control border-0  " + o_style.bgcolor}
                onChange={handlePassword}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="row">
                <div className="col-4">
                  Admin{" "}
                  <input
                    type="radio"
                    className="form-contorl"
                    name="role"
                    value="ADMIN"
                    onClick={handleRole}
                  />
                </div>
                <div className="col-4">
                  Manager{" "}
                  <input
                    type="radio"
                    className="form-contorl"
                    name="role"
                    value="MNG"
                    onClick={handleRole}
                  />
                </div>
                <div className="col-4">
                  Employee{" "}
                  <input
                    type="radio"
                    className="form-contorl"
                    name="role"
                    value="EMP"
                    onClick={handleRole}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                onClick={handleSignInRequest}
                type="submit"
                value="Sign In"
                className={"form-control btn btn-primary " + o_style.submitBtn}
              ></input>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default SignIn;

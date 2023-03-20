import React, { useState } from "react";
import styles from "./nav.module.css";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
  const [sideBar, setSidebar] = useState(false);
  const navigate = useNavigate;

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("auth_ac");
    props.setLogin(false);
    window.location.replace("/");
  };
  const sidebar = () => {
    if (sideBar) {
      document.getElementById("mySidebar").style.width = "0px";
      document.getElementById("mainContent").style.marginLeft = "20px";
      document.getElementById("footer").style.marginLeft = "0px";
      document.getElementById("footer").style.width = "100%";
      setSidebar(false);
    } else {
      document.getElementById("mainContent").style.marginLeft = "300px";
      document.getElementById("mySidebar").style.width = "300px";
      document.getElementById("footer").style.marginLeft = "300px";
      document.getElementById("footer").style.width = "78%";
      setSidebar(true);
    }
  };

  return (
    <nav className={"navbar  navbar-light  fixed-top " + styles.mainNav}>
      <div className="container">
        <a className={"navbar-brand " + styles.logo} href="#">
          <i className="fab fa-linkedin fa-2x" onClick={sidebar}></i>
        </a>
        <div id="navbarSupportedContent">
          <ul className={styles.profile + " ms-auto mb-2 mb-lg-0"}>
            <li className="nav-item">
              <div className="nav-link   d-flex align-items-center ">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                  className="rounded-circle "
                  height="30"
                  alt=""
                  loading="lazy"
                />
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Setting
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={logout}>
                        logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;

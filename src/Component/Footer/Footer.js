import React from "react";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <div
    id="footer"
      className={
        style.fixed +
        " d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5  "
      }
    >
      <div className="text-black mb-3 mb-md-0">
        Copyright GOMAX-TOOL 2023. All rights reserved.
      </div>

      <div>
        <a href="#!" className="text-black me-4">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#!" className="text-black me-4">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#!" className="text-black me-4">
          <i className="fab fa-google"></i>
        </a>
        <a href="#!" className="text-black">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  );
};
export default Footer;

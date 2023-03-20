import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

function Tosters() {
  return ReactDOM.createPortal(
    <div id="tost">
      <ToastContainer />
    </div>,
    document.getElementById("overlays")
  );
}
export default Tosters;

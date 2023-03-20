import React from "react";
import ReactDOM from "react-dom";
import {
  BounceLetterLoaderOverlay,
  WindmillSpinnerOverlay,
} from "react-spinner-overlay";

export const SignLoader = (props) => {
  return ReactDOM.createPortal(
    <div id="signLoader">
      <BounceLetterLoaderOverlay
        letters="Signing User"
        loading={props.loading}
        color="black"
      />
    </div>,
    document.getElementById("overlays")
  );
};

export const ArticlesLoader = (props) => {
  return ReactDOM.createPortal(
    <div id="articleLoader">
      <WindmillSpinnerOverlay
        letters={props.message}
        loading={props.loading}
        color="black"
      />
    </div>,
    document.getElementById("overlays")
  );
};

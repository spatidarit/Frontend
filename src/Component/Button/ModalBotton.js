import React from "react";

const ModalButton = (props) => {
  return (
    <button
      type="button"
      className={"btn btn-warning text-dark "}
      data-bs-toggle="modal"
      data-bs-target={"#" + props.id}
      onClick={() => {
        props.action && props.action(null);
      }}
    >
      {props.title}
    </button>
  );
};

export default ModalButton;

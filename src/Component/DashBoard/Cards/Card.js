import React from "react";
import decor from "./style.module.css";

const Card = (props) => {
  return (
    <div className={"card p-3 rounded " + decor.cardContainer}>
      <div className="card-block" align="center">
        <h5 className="card-subtitle ">{props.title}</h5>
        <h1 className="card-title " align="center">
          {props.count}
        </h1>
      </div>
    </div>
  );
};
export default Card;

import React from "react";

const Cards = (props) => {
  return (
    <div className="container">
      <div className="row hidden-md-up">
        {props.elements.map((item, index) => {
          return (
            <div className="col-md-12 col-lg-4  mt-2 " key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Cards;

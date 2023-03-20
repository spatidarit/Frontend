import React, { useEffect } from "react";
import Card from "../Cards/Card";
import Cards from "../Cards/Cards";
import decor from "./style.module.css";
import EmployeeArticleChart from "../Charts/EmployeeArticleChart";
import ManagerArticleChart from "../Charts/ManagerArticleChart";

const Home = () => {
  const cards = [
    <Card title="Total Article" count="120" />,
    <Card title="Saved Article" count="20" />,
    <Card title="Deleted Article" count="05" />,
  ];

  return (
    <div className="container">
      <div className={"row  "} align="center">
        <div className={" col " + decor.cards}>
          {" "}
          <Cards elements={cards} />
        </div>
      </div>
      <div
        className={"row " + decor.content + " " + decor.graph}
        align="center"
      >
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          {" "}
          <ManagerArticleChart />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          {" "}
          <EmployeeArticleChart />
        </div>
      </div>
    </div>
  );
};
export default Home;

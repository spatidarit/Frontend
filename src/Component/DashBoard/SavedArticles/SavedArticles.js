import React from "react";
import { Outlet } from "react-router-dom";
import ArticleList from "../Lists/ArticleList";
import designs from "./style.module.css";

const SavedArticles = () => {
  return (
    <div className={"container " + designs.content}>
      <div className="row " align="center">
        "
        <div className="col ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default SavedArticles;

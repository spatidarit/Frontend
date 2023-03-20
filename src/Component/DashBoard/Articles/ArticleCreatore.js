import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ArticlesLoader } from "../../Overlays/Loader";
import SearchBar from "./SearchBar";

const ArticleCreatore = () => {
  const state = useSelector((state) => state.ArticleCreatorReducer);

  return (
    <div className="container ">
      <ArticlesLoader loading={state.loading} message={state.loadingMessage} />
      <div className="row " align="center">
        <div className="col ">
          {" "}
          <SearchBar />
        </div>
      </div>
      <div className="row " align="center">
        "
        <div className="col ">
          <section className="" style={{ backgroundColor: " #eee" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-10">
                  <Outlet />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ArticleCreatore;

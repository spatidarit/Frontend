import { Markup } from "interweave";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Article = () => {
  const selectedArticles = useSelector(
    (state) => state.articleReducer.selectedArticles
  );

  return (
    <div className="container ">
      <div className="row " align="center">
        <div className="col ">
          <section className="" style={{ backgroundColor: " #eee" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-10">
                  <div className="card overflow-auto">
                    <div className="card-header p-3">
                      <h2 className="mb-0">
                        <i className="fas fa-tasks me-2">{}</i>
                      </h2>
                    </div>
                    <div
                      className="card-body"
                      data-mdb-perfect-scrollbar="true"
                      style={{ position: "relative", height: "400px" }}
                    >
                      <h3 className="mb-0"></h3>
                      <table className="table mb-0">
                        <tbody>
                          <tr className="fw-normal">
                            <td className="align-middle">
                              <h6 className="mb-0"></h6>
                              {selectedArticles && (
                                <Markup content={selectedArticles.content} />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Article;

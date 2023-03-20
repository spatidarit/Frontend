import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  fetchUserArticlesInfo,
  fetchEmployeeArticlesInfo,
} from "../../../Store/Actions/ArticleAction";
import { savedArticleAction } from "../../../Store/AppReducer";

const ArticleList = () => {
  const { dispatch } = useOutletContext();
  const { articlesInfo, totalArticlePage, userId, articlesDetails } =
    useSelector((state) => {
      return {
        articlesInfo: state.articleReducer.articlesInfo,
        totalArticlePage: state.articleReducer.totalArticlePage,
        userId: state.articleReducer.userId,
        articlesDetails: state.articleReducer.articles,
      };
    });
  useEffect(() => {
    if (userId == "") {
      dispatch(fetchUserArticlesInfo(1));
    }
  }, []);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const rightPage = () => {
    if (page < totalArticlePage) {
      setPage((pre) => {
        return pre + 1;
      });

      userId != ""
        ? dispatch(fetchEmployeeArticlesInfo(page + 1))
        : dispatch(fetchUserArticlesInfo(page + 1));
    }
  };
  const leftPage = () => {
    if (page > 1) {
      setPage((pre) => {
        return pre - 1;
      });

      userId != ""
        ? dispatch(fetchEmployeeArticlesInfo(page - 1))
        : dispatch(fetchUserArticlesInfo(page - 1));
    }
  };
  const goToArticle = (id) => {
    articlesDetails.filter((item) => {
      if (item._id === id) {
        dispatch(savedArticleAction.setSelectedArticle(item));
      }
    });
    navigate("article");
  };
  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container ">
        {articlesInfo[0] == null && (
          <div align="center " className="mb-10">
            <h1>Articles Not Found</h1>
          </div>
        )}

        <div className="row flex-lg-nowrap">
          <div className="col mb-3">
            <div className="e-panel card">
              <div className="card-body">
                <div className="card-title">
                  <h6 className="mr-2">
                    <span>Users</span>
                    <small className="px-1">Be a wise leader</small>
                  </h6>
                </div>
                <div className="e-table">
                  <div className="table-responsive table-lg mt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="max-width">Title</th>
                          <th className="sortable">Author Name</th>
                          <th>Created Date</th>
                          <th>View Article</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articlesInfo.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-nowrap align-middle">
                                {item.title}
                              </td>
                              <td className="text-nowrap align-middle">
                                <span>{item.authorName}</span>
                              </td>
                              <td className="text-nowrap align-middle">
                                <span>{item.created_Date}</span>
                              </td>
                              <td className="text-center align-middle">
                                <div className="btn-group align-top">
                                  <button
                                    className="btn btn-sm btn-outline-secondary "
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#user-form-modal"
                                    onClick={() => {
                                      goToArticle(item._id);
                                    }}
                                  >
                                    View
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-center">
                    <ul className="pagination mt-3 mb-0">
                      <li className=" page-item">
                        <a onClick={leftPage} className="page-link">
                          ‹
                        </a>
                      </li>
                      <li className="active page-item">
                        <a className="page-link">{page}</a>
                      </li>

                      <li className="page-item">
                        <a onClick={rightPage} className="page-link">
                          ›
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ArticleList;

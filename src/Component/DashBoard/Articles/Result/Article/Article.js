import { Markup } from "interweave";
import jwtDecode from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArticleApi from "../../../../../API/ArticleApi";

const Article = (props) => {
  const navigate = useNavigate();
  const articleApi = new ArticleApi();
  const state = useSelector((state) => state.ArticleCreatorReducer);
  const saveArticle = async () => {
    let articleRequest = {
      title: state.selectTopic,
      content: state.article,
      userId: localStorage.getItem("id"),
      authorName: jwtDecode(localStorage.getItem("auth_ac")).name,
    };
    const articleResponse = await articleApi.saveArticle(articleRequest);
    toast(articleResponse.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const goToOutlines = () => {
    navigate("/dashboard/article_creator/outlines");
  };
  return (
    <div className="card overflow-auto">
      <div className="card-header p-3">
        <h5 className="mb-0">
          <i className="fas fa-tasks me-2"></i>Article
        </h5>
        <button
          className="btn  btn-primary d-inline float-start"
          onClick={goToOutlines}
        >
          <i className="fa fa-arrow-circle-left"></i>
        </button>
      </div>
      <div
        className="card-body"
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px" }}
      >
        <h6 className="mb-0">
          <button className="badge bg-success" onClick={saveArticle}>
            Save Articles
          </button>
        </h6>
        <table className="table mb-0">
          <tbody>
            <tr className="fw-normal">
              <td className="align-middle">
                <h6 className="mb-0"></h6>
                <Markup content={state.article} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Article;

import { Markup } from "interweave";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchArtilce } from "../../../../../Store/Actions/ArticleAction";
import { artilceCreationAction } from "../../../../../Store/AppReducer";

const Outlines = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.ArticleCreatorReducer);
  const onSelectOutline = (e) => {
    dispatch(
      artilceCreationAction.setLoadingMessage(
        "Searching Article for " + e.target.value
      )
    );
    dispatch(artilceCreationAction.selectTheOutline(e.target.value));
    dispatch(artilceCreationAction.setLoader(true));
    dispatch(fetchArtilce(e.target.value));
    navigate("/dashboard/article_creator/article");
  };
  const goToTopics = () => {
    navigate("/dashboard/article_creator/topics");
  };
  const goToArticle = () => {
    navigate("/dashboard/article_creator/article");
  };
  return (
    <div className="card overflow-auto">
      <div className="card-header p-3">
        <h5 className="mb-0">
          <i className="fas fa-tasks me-2"></i>Outlines List
        </h5>
        <button
          className="btn  btn-primary d-inline float-start"
          onClick={goToTopics}
        >
          <i className="fa fa-arrow-circle-left"></i>
        </button>
        <button
          className="btn  btn-primary d-inline float-end"
          onClick={goToArticle}
        >
          <i className="fa fa-arrow-circle-right"></i>
        </button>
      </div>
      <div
        className="card-body"
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px" }}
      >
        <table className="table mb-0">
          <tbody>
            {state.outlines.map((item, index) => {
              return (
                <tr className="fw-normal" key={index}>
                  <td className="align-middle">
                    <h6 className="mb-0">
                      <button
                        className="badge bg-success"
                        value={item}
                        onClick={onSelectOutline}
                      >
                        Create Articles
                      </button>
                    </h6>

                    <ul>
                      <Markup content={item.text} containerTagName={"li"} />
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Outlines;

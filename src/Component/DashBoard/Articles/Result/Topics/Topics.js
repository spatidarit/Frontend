import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOutlines } from "../../../../../Store/Actions/ArticleAction";
import { artilceCreationAction } from "../../../../../Store/AppReducer";

const Topics = () => {
  const state = useSelector((state) => state.ArticleCreatorReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSelectTopic = (e) => {
    dispatch(
      artilceCreationAction.setLoadingMessage(
        "Searching Outlines for " + e.target.value
      )
    );
    dispatch(artilceCreationAction.selectTheTopic(e.target.value));
    dispatch(artilceCreationAction.setLoader(true));
    dispatch(fetchOutlines(e.target.value));
    navigate("/dashboard/article_creator/outlines");
  };
  const goToOutlines = () => {
    navigate("/dashboard/article_creator/outlines");
  };
  return (
    <div className="card overflow-auto">
      <div className="card-header p-3">
        <h5 className="mb-0">
          <i className="fas fa-tasks me-2"></i>Keyword Topic List
        </h5>
        <button
          className="btn  btn-primary d-inline float-end"
          onClick={goToOutlines}
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
          <thead>
            <tr>
              <th scope="col">Topics List</th>
            </tr>
          </thead>
          <tbody>
            {state.topics.map((item, index) => {
              let topic = item.replace(/[0-9]/g, "").replace(". ", "");
              let element = item != "" && (
                <tr className="fw-normal" key={index}>
                  <th className="text-center">
                    <span className="ms-2">{topic}</span>
                  </th>
                  <td className="align-middle">
                    <h6 className="mb-0">
                      <button
                        className="badge bg-success"
                        value={topic}
                        onClick={onSelectTopic}
                      >
                        Create Outlines
                      </button>
                    </h6>
                  </td>
                </tr>
              );
              return element;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Topics;

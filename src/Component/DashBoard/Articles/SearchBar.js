import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTopics } from "../../../Store/Actions/ArticleAction";
import { artilceCreationAction } from "../../../Store/AppReducer";

const SearchBar = () => {
  const state = useSelector((state) => state.ArticleCreatorReducer);
  const dispatch = useDispatch();
  const [keywords, setKeyWords] = useState("");
  const navigate = useNavigate();
  const handleKeyword = (e) => {
    setKeyWords(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      artilceCreationAction.setLoadingMessage(
        "Searching Topics for " + keywords
      )
    );
    dispatch(artilceCreationAction.setLoader(true));
    dispatch(fetchTopics(keywords));
    navigate("/dashboard/article_creator/topics");
  };

  return (
    <form>
      <input
        className="form-control me-1 w-75"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleKeyword}
      />
      <br />
      <button className="btn btn-primary" type="button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

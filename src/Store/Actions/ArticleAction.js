import { toast } from "react-toastify";
import ArticleApi from "../../API/ArticleApi";
import { artilceCreationAction, savedArticleAction } from "../AppReducer";

const articleApi = new ArticleApi();

export const fetchTopics = (keyword) => {
  const prompt = "provide topics on " + keyword + " for article";
  return (dispatch, getState) => {
    articleApi
      .getDataFromAI(prompt, 1)
      .then((response) => {
        const topics = response.data.choices[0].text.split("\n");
        dispatch(artilceCreationAction.saveTopics(topics));
        dispatch(artilceCreationAction.setLoader(false));
      })
      .catch((err) => {
        dispatch(artilceCreationAction.setLoader(false));
        toast.error(err.message);
      });
  };
};

export const fetchOutlines = (topic) => {
  const prompt = "write outlines for article on " + topic;
  return (dispatch, getState) => {
    articleApi
      .getDataFromAI(prompt, 2)
      .then((res) => {
        dispatch(artilceCreationAction.setOutlines(res.data.choices));
        dispatch(artilceCreationAction.setLoader(false));
      })
      .catch((err) => {
        dispatch(artilceCreationAction.setLoader(false));
        toast.error(err.message);
      });
  };
};

export const fetchArtilce = (outline) => {
  return (dispatch, getState) => {
    const state = getState().ArticleCreatorReducer;
    const prompt =
      "write full detailed  article on " +
      state.selectTopic +
      "  with below  outlines : " +
      outline +
      "    in html list formate with inline css";
    articleApi
      .getDataFromAI(prompt, 2)
      .then((res) => {
        dispatch(artilceCreationAction.setArticle(res.data.choices[0].text));
        dispatch(artilceCreationAction.setLoader(false));
      })
      .catch((err) => {
        dispatch(artilceCreationAction.setLoader(false));
        toast.error(err.message);
      });
  };
};

export const fetchUserArticlesInfo = (page) => {
  return async (dispatch, getState) => {
    await articleApi.getUserArticlesInfo(page).then((response) => {
      return dispatch(savedArticleAction.articleSave(response.data.data));
    });
  };
};

export const fetchEmployeeArticlesInfo = (page) => {
  return async (dispatch, getState) => {
    const articleReducer = getState().articleReducer;
    await articleApi
      .getEmployeeArticlesInfo(page, articleReducer.userId)
      .then((response) => {
        return dispatch(savedArticleAction.articleSave(response.data.data));
      });
  };
};

import axios from "axios";
import { toast } from "react-toastify";

class ArticleApi {
  getDataFromAI = async (prompt, total, dispatch) => {
    const payload = {
      prompt: prompt,
      temperature: 0.9,
      n: total,
      max_tokens: 4000,
      model: "text-davinci-003",
    };
    return await axios.post("https://api.openai.com/v1/completions", payload, {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  saveArticle = async (artcileData) => {
    const url = "http://localhost:3001/article/add_article";
    return await axios
      .post(url, artcileData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  getUserArticlesInfo = async (page) => {
    let url =
      "http://localhost:3001/article/user_article_info?page=" +
      page +
      "&size=1";

    return await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  getEmployeeArticlesInfo = async (page, userId) => {
    let url =
      "http://localhost:3001/article/employee_articles_info?page=" +
      page +
      "&size=10&userId=" +
      userId;

    return await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  getArticle = async (articleId) => {
    let url = "http://localhost:3001/article?articleId=" + articleId;

    return await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_ac"),
        },
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
}
export default ArticleApi;

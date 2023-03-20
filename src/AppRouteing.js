import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import SignIn from "./Component/Sign/SignIn";
import DashBoard from "./Component/DashBoard/DashBoard";
import Home from "./Component/DashBoard/Admin/Home";
import ManagerList from "./Component/DashBoard/Lists/ManagerList";
import EmployeeList from "./Component/DashBoard/Lists/EmployeeList";
import ArticleCreatore from "./Component/DashBoard/Articles/ArticleCreatore";
import Topics from "./Component/DashBoard/Articles/Result/Topics/Topics";
import Outlines from "./Component/DashBoard/Articles/Result/Outlines/Outlines";
import Article from "./Component/DashBoard/Articles/Result/Article/Article";
import SavedArticle from "./Component/DashBoard/SavedArticles/Article";
import { authAction } from "./Store/AppReducer";
import jwtDecode from "jwt-decode";
import ArticleList from "./Component/DashBoard/Lists/ArticleList";
import DomianList from "./Component/DashBoard/Domain-List/DomainList";
import ProjectList from "./Component/DashBoard/Lists/ProjectList";

const AppRouteing = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("auth_ac") ? true : false
  );
  useEffect(() => {
    const token = localStorage.getItem("auth_ac");
    if (token != null) {
      const user = jwtDecode(token);
      if (user != null) user && dispatch(authAction.setRole(user.role));
    }
  }, [isLogin]);

  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route
            path="/dashboard"
            element={<DashBoard isLogin={isLogin} setLogin={setIsLogin} />}
          >
            <Route path="" element={<Home />} />
            <Route path="manager_list" element={<ManagerList />} />
            <Route path="employee_list" element={<EmployeeList />} />
            <Route path="article_creator/" element={<ArticleCreatore />}>
              <Route path="topics" element={<Topics />} />
              <Route path="outlines" element={<Outlines />} />
              <Route path="article" element={<Article />} />
            </Route>
            <Route path="saved_articles/">
              <Route path="" element={<ArticleList />} />
              <Route path="article" element={<SavedArticle />} />
            </Route>
            <Route path="domain_list" element={<DomianList />} />
            <Route path="project_list" element={<ProjectList />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={<SignIn isLogin={isLogin} setLogin={setIsLogin} />}
          />
        )}
        <Route
          path="/*"
          element={<SignIn isLogin={isLogin} setLogin={setIsLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default connect((state) => {
  return state;
})(AppRouteing);

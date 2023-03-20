import {
  managerSlice as ManagerSlice,
  employeeSlice as EmployeeSlice,
  articleCreatorSlice,
  authSlice,
  savedArticleSlice,
  domainDataSlice,
  projectSlice,
} from "./AppReducer";
import { configureStore } from "@reduxjs/toolkit";

const allReducers = {
  managerReducer: ManagerSlice.reducer,
  employeeReducer: EmployeeSlice.reducer,
  ArticleCreatorReducer: articleCreatorSlice.reducer,
  authReducer: authSlice.reducer,
  articleReducer: savedArticleSlice.reducer,
  domainReducer: domainDataSlice.reducer,
  projectReducer: projectSlice.reducer,
};
const AppStore = configureStore({ reducer: allReducers });
export default AppStore;

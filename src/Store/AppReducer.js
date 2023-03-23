import { createSlice } from "@reduxjs/toolkit";
import {} from "bcryptjs";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "",
  },
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    managerId: "",
    totalEmployeePage: 0,
  },
  reducers: {
    employeesSave(state, action) {
      state.totalEmployeePage = action.payload.total;
      state.employees = action.payload.employees;
    },
    saveManagerId(state, action) {
      state.managerId = action.payload;
    },
  },
});

export const managerSlice = createSlice({
  name: "managers",
  initialState: {
    managers: [],
  },
  reducers: {
    managerSave(state, action) {
      state.managers = action.payload;
    },
  },
});

export const articleCreatorSlice = createSlice({
  name: "artilceCrator",
  initialState: {
    topics: [],
    loading: false,
    loadingMessage: "",
    outlines: [],
    article: "",
    selectTopic: "",
    selectOutline: "",
  },
  reducers: {
    saveTopics(state, action) {
      state.topics = action.payload;
    },
    setLoader(state, action) {
      state.loading = action.payload;
    },
    setLoadingMessage(state, action) {
      state.loadingMessage = action.payload;
    },
    setOutlines(state, action) {
      state.outlines = action.payload;
    },
    setArticle(state, action) {
      state.article = action.payload;
    },
    selectTheTopic(state, action) {
      state.selectTopic = action.payload;
    },
    selectTheOutline(state, action) {
      state.selectOutline = action.payload;
    },
  },
});

export const savedArticleSlice = createSlice({
  name: "savedArticle",
  initialState: {
    articlesInfo: [],
    totalArticlePage: 0,
    userId: "",
    articles: [],
    selectedArticles: {},
  },
  reducers: {
    articleSave(state, action) {
      state.totalArticlePage = action.payload.total;
      state.articles = action.payload.articlesDetails;
      state.articlesInfo = action.payload.articlesInfo;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setArticleId(state, action) {
      state.articleId = action.payload;
    },
    setSelectedArticle(state, action) {
      state.selectedArticles = action.payload;
    },
  },
});

export const domainDataSlice = createSlice({
  name: "domainData",
  initialState: {
    projectList: [],
    ProjectId: "",
    domainList: [],
    serachDomainList:[],
    
  },
  reducers: {
    setDomainList(state, action) {
      console.log(action.payload.domains);
      state.domainList = action.payload.domains;
    },
    setProjectId(state, action) {
      state.ProjectId = action.payload;
    },
    setSerachDomainList(state, action) {
      state.serachDomainList = action.payload;
    },
    
  },
});

export const projectSlice = createSlice({
  name: "projectData",
  initialState: {
    projectList: [],
  },
  reducers: {
    setProjectList(state, action) {
      state.projectList = action.payload.projects;
    },
  },
});

export const artilceCreationAction = articleCreatorSlice.actions;
export const managerActions = managerSlice.actions;
export const employeeAction = employeeSlice.actions;
export const authAction = authSlice.actions;
export const savedArticleAction = savedArticleSlice.actions;
export const domainDataAction = domainDataSlice.actions;
export const projectAction = projectSlice.actions;

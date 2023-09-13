import axios from "axios"
import store from "./store";

const baseURL = "/api";

const axiosToken = axios.create();
axiosToken.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    let token = state.userData.token
    config.headers["authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const register = (user) => axios.post(`${baseURL}/user/register`, user);
export const login = (user) => axios.post(`${baseURL}/user/login`, user)

export const createQuestion = (question) => axiosToken.post(`${baseURL}/question`, question)
export const getQuestions = () => axiosToken.get(`${baseURL}/question`)
export const editQuestion = (questionId, question) => axiosToken.patch(`${baseURL}/question`, question)

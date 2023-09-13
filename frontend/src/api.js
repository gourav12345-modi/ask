import axios from "axios"

const baseURL = "/api";
export const register = (user) => axios.post(`${baseURL}/user/register`, user);
export const login = (user) => axios.post(`${baseURL}/user/login`, user)
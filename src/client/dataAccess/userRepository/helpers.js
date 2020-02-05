import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});

export const createUser = payload => api.post(`/sign`, payload);

export const loginUser = payload => api.post(`/login`, payload);

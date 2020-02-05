import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createUser = payload => api.post(`/sign`, payload);

export const loginUser = payload => api.post(`/post`, payload);

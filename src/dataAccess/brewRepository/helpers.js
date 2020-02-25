import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createBrew = payload => api.post(`/add-brew`, payload);

export const findBrews = time => api.get(`/brews/${time}`);

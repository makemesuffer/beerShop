import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createBrew = payload => api.post(`/add-brew`, payload);

export const findBrews = () => api.get(`/brews`);

export const findSingleBrew = id => api.get(`/brews/${id}`);

export const ratingChange = payload => api.post(`/brews/rating`, payload);

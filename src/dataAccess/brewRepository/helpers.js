import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createBrew = payload => api.post(`/add-brew`, payload);

export const findBrews = () => api.get(`/brews`);

export const findSingleBrew = id => api.get(`/brews/${id}`);

export const messageAdd = payload => api.post(`/brews/message`, payload);

export const deleteComment = payload => api.post(`/brews/delete`, payload);

export const likePost = payload => api.put(`/likeBrew`, payload);

export const dislikePost = payload => api.put(`/dislikeBrew`, payload);

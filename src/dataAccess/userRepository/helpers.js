import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createUser = payload => api.post(`/sign`, payload);

export const loginUser = payload => api.post(`/login`, payload);

export const findUser = id => api.get(`/users/${id}`);

export const addBeer = payload => api.post(`/add-beer`, payload);

export const deleteBeer = payload => api.post(`/delete-beer`, payload);

export const changePassword = payload =>
  api.post(`/users/:id/change-password`, payload);

export const forgotPassword = payload => api.post(`/password`, payload);

export const checkMessage = payload => api.post(`/confirm`, payload);

export const replacePassword = payload => api.post(`/pass`, payload);

export const uploadImage = payload => api.post(`/add-image`, payload);

export const deleteImage = payload => api.post(`/delete-image`, payload);

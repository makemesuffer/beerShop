import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createUser = payload => api.post(`/sign`, payload);

export const loginUser = payload => api.post(`/login`, payload);
// POST: create new session? or PUT: /login/:userId ???

export const findUser = id => api.get(`/users/${id}`);

export const addBeer = payload =>
  api.put(`/users/${payload.userId}/beers/${payload.id}`);

export const deleteBeer = payload =>
  api.delete(`/users/${payload.userId}/beers/${payload.id}`);

export const changePassword = payload =>
  api.put(`/users/${payload.id}/password/`, payload);

export const forgotPassword = payload => api.post(`/password`, payload);
// POST: create new password

export const checkMessage = payload => api.get(`/confirmation/${payload.code}`);
// GET: get confirmation code

export const replacePassword = payload =>
  api.put(`/password/${payload.id}`, payload);
// PUT: update password for userID

export const uploadImage = payload =>
  api.put(`/users/${payload.userId}/images`, payload);

export const deleteImage = payload =>
  api.delete(`/users/${payload.userId}/images/${payload.imgId}`);

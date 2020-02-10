import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

export const createUser = payload => api.post(`/sign`, payload);

export const loginUser = payload => api.post(`/login`, payload);

export const findUser = id => api.get(`/users/${id}`);

export const addBeer = payload => api.post(`/add-beer`, payload);

export const deleteBeer = payload => api.post(`/delete-beer`, payload);

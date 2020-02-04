import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337"
});

const createUser = payload => api.post(`/sign`, payload);

export default createUser;

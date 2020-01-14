import axios from "axios";

const api = name => {
  return `https://api.punkapi.com/v2/beers?beer_name=${name}&per_page=9`;
};

const testApi = (name, page) => {
  return `https://api.punkapi.com/v2/beers?beer_name=${name}&page=${page}&per_page=9`;
};

export const getBeerByName = name => {
  return axios.get(`${api(name)}`);
};

export const continueBeer = (name, page) => {
  return axios.get(`${testApi(name, page)}`);
};

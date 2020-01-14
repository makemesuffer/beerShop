import axios from "axios";

// TODO: отдельные файлы

const api = (page = 1) => {
  // FIXME query params to object
  return `https://api.punkapi.com/v2/beers?page=${page}&per_page=9`;
};

export const getSearchResult = () => {
  return axios.get(`${api()}`);
};

export const getScrollResult = page => {
  return axios.get(`${api(page)}`);
};

import axios from "axios";

const singleBeer = id => {
  return `https://api.punkapi.com/v2/beers/${id}`;
};

export const getSingleBeer = id => {
  return axios.get(`${singleBeer(id)}`);
};

const listed = () => {
  return `https://api.punkapi.com/v2/beers?&per_page=9`;
};

export const getSearchResult = () => {
  return axios.get(`${listed()}`);
};

export const getScrollResult = page => {
  return axios.get(`${listed()}`, {
    params: {
      page
    }
  });
};

export const getBeerByName = name => {
  return axios.get(`${listed()}`, {
    params: {
      beer_name: name
    }
  });
};

export const continueBeer = (name, page) => {
  return axios.get(`${listed()}`, {
    params: {
      beer_name: name,
      page
    }
  });
};

export const getBeerByFilters = (name, abv, ibu, ebc) => {
  return axios.get(`${listed()}`, {
    params: {
      beer_name: name,
      abv_gt: abv,
      ibu_gt: ibu,
      ebc_gt: ebc
    }
  });
};

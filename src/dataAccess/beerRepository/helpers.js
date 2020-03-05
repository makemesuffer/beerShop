import axios from "axios";

const singleBeer = id => {
  return `https://api.punkapi.com/v2/beers/${id}`;
};

export const getSingleBeer = id => {
  return axios.get(`${singleBeer(id)}`);
};

export const getBeersById = array => {
  return array.map(id => getSingleBeer(id));
};

const listedBeer = () => {
  return `https://api.punkapi.com/v2/beers`;
};

export const getListOfBeers = (perPage, page, name, abv, ibu, ebc) => {
  return axios.get(`${listedBeer()}`, {
    params: {
      beer_name: name,
      abv_gt: abv,
      ibu_gt: ibu,
      ebc_gt: ebc,
      per_page: perPage,
      page
    }
  });
};

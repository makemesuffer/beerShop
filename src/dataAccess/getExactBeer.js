import axios from "axios";
// FIXME move to a single repository
const api = id => {
  return `https://api.punkapi.com/v2/beers/${id}`;
};

const getSingleBeer = id => {
  return axios.get(`${api(id)}`);
};

export default getSingleBeer;

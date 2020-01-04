import axios from "axios";

// TODO: improve the logic nu eto potom

const api = "https://api.punkapi.com/v2/beers";

const getSearchResult = () => {
  return axios.get(`${api}`);
};

export default getSearchResult;

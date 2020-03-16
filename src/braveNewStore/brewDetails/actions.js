import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";
import {
  dislikePost,
  findSingleBrew,
  likePost
} from "../../dataAccess/brewRepository/helpers";
import { getListOfBeers } from "../../dataAccess/beerRepository/helpers";

export const getBrewDetails = createAction(actionTypes.GET_BREW, async id => {
  const response = await findSingleBrew(id);
  return response.data;
});

export const getBeerDetails = createAction(actionTypes.GET_BEER, async name => {
  const response = await getListOfBeers(1, null, name);
  return response.data.pop();
});

export const getRatingChange = createAction(
  actionTypes.CHANGE_RATING,
  async (decision, payload) => {
    const response =
      decision === "+" ? await likePost(payload) : await dislikePost(payload);
    return response.data.brew;
  }
);

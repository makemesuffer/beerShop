import { createAction } from "redux-actions";

import moment from "moment";
import actionTypes from "./actionTypes";
import {
  dislikePost,
  filterBrews,
  findBrews,
  likePost
} from "../../dataAccess/brewRepository/helpers";

export const getBrewList = createAction(actionTypes.GET_BREWS, async () => {
  const response = await findBrews();
  return response.data.sort((a, b) => {
    return b.rating - a.rating;
  });
});

export const getRatingChange = createAction(
  actionTypes.CHANGE_RATING,
  async (decision, payload) => {
    const response =
      decision === "+" ? await likePost(payload) : await dislikePost(payload);
    return response.data.brews.sort((a, b) => {
      return b.rating - a.rating;
    });
  }
);

export const getFilteredBrews = createAction(
  actionTypes.GET_FILTERED_BREWS,
  async (type, time) => {
    const response = await filterBrews(type);
    let brews;
    switch (time) {
      case "Day":
        brews = response.data.filter(post => {
          return moment().diff(post.createdAt, "days") < 1;
        });
        break;
      case "Week":
        brews = response.data.filter(post => {
          return moment().diff(post.createdAt, "days") < 7;
        });
        break;
      case "Month":
        brews = response.data.filter(post => {
          return moment().diff(post.createdAt, "days") < 30;
        });
        break;
      case "Year":
        brews = response.data.filter(post => {
          return moment().diff(post.createdAt, "days") < 365;
        });
        break;
      default:
        brews = response.data;
    }
    return brews.sort((a, b) => {
      return b.rating - a.rating;
    });
  }
);

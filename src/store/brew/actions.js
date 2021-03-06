import moment from "moment";

import { getListOfBeers } from "../../dataAccess/beerRepository/helpers";
import {
  findBrews,
  findSingleBrew,
  dislikePost,
  likePost,
  messageAdd,
  deleteComment,
  filterBrews
} from "../../dataAccess/brewRepository/helpers";
import actionTypes from "./actionTypes";

const getBeerNamesSuccess = response => ({
  type: actionTypes.GET_BEER_NAMES,
  payload: response
});

export const getBeerNames = name => async dispatch => {
  const response = await getListOfBeers(50, null, name);
  const result = response.data.map(elem => {
    return { id: elem.id, name: elem.name };
  });
  dispatch(getBeerNamesSuccess(result));
};

const getBeerByNameSuccess = response => ({
  type: actionTypes.GET_BEER_BY_NAME,
  payload: response
});

export const getBeerByName = name => async dispatch => {
  const response = await getListOfBeers(1, null, name);
  dispatch(getBeerByNameSuccess(...response.data));
};

const getBrewListSuccess = response => ({
  type: actionTypes.GET_BREWS_LIST,
  payload: response
});

export const getBrewList = () => async dispatch => {
  const response = await findBrews();
  dispatch(
    getBrewListSuccess(
      response.data.sort((a, b) => {
        return b.rating - a.rating;
      })
    )
  );
};

const getBrewByIdSuccess = response => ({
  type: actionTypes.GET_BREW_BY_ID,
  payload: response
});

export const getBrewById = id => async dispatch => {
  const response = await findSingleBrew(id);
  dispatch(getBrewByIdSuccess(response.data));
};

const getRatingChangeSuccess = response => ({
  type: actionTypes.GET_RATING_CHANGE,
  payload: response
});

const getError = error => ({
  type: actionTypes.GET_ERROR,
  payload: error
});

export const getRatingChange = (decision, payload) => async dispatch => {
  try {
    const response =
      decision === "+" ? await likePost(payload) : await dislikePost(payload);
    dispatch(getRatingChangeSuccess(response.data.rating));
  } catch (e) {
    dispatch(getError(e.response.data));
  }
};

const addDeleteCommentSuccess = response => ({
  type: actionTypes.ADD_DELETE_COMMENT,
  payload: response
});

export const addComment = message => async dispatch => {
  try {
    const response = await messageAdd(message);
    dispatch(addDeleteCommentSuccess(response.data));
  } catch (e) {
    dispatch(getError(e.response.data));
  }
};

export const deleteMessage = payload => async dispatch => {
  try {
    const response = await deleteComment(payload);
    dispatch(addDeleteCommentSuccess(response.data));
  } catch (e) {
    dispatch(getError(e.response.data));
  }
};

const getFilteredBrewsSuccess = response => ({
  type: actionTypes.FILTER_BREWS_SUCCESS,
  payload: response
});

export const getFilteredBrews = type => async dispatch => {
  try {
    const response = await filterBrews(type);
    dispatch(getFilteredBrewsSuccess(response.data));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getFilteredTime = (time, brews) => async dispatch => {
  try {
    switch (time) {
      case "Day":
        dispatch(
          getFilteredBrewsSuccess(
            brews
              .filter(post => {
                return moment().diff(post.createdAt, "days") < 1;
              })
              .sort((a, b) => {
                return b.rating - a.rating;
              })
          )
        );
        break;
      case "Week":
        dispatch(
          getFilteredBrewsSuccess(
            brews
              .filter(post => {
                return moment().diff(post.createdAt, "days") < 7;
              })
              .sort((a, b) => {
                return b.rating - a.rating;
              })
          )
        );
        break;
      case "Month":
        dispatch(
          getFilteredBrewsSuccess(
            brews
              .filter(post => {
                return moment().diff(post.createdAt, "days") < 30;
              })
              .sort((a, b) => {
                return b.rating - a.rating;
              })
          )
        );
        break;
      case "Year":
        dispatch(
          getFilteredBrewsSuccess(
            brews
              .filter(post => {
                return moment().diff(post.createdAt, "days") < 365;
              })
              .sort((a, b) => {
                return b.rating - a.rating;
              })
          )
        );
        break;
      default:
        return dispatch(
          getFilteredBrewsSuccess(
            brews.sort((a, b) => {
              return b.rating - a.rating;
            })
          )
        );
    }
  } catch (e) {
    console.log(e.response.data);
  }
};

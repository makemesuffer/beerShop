import { createAction } from "redux-actions";

import actionTypes from "./actionTypes";

export const setValue = createAction(actionTypes.SET_VALUE);
export const setFilters = createAction(actionTypes.SET_FILTERS);
export const setParams = createAction(actionTypes.SET_PARAMS);
export const setScroll = createAction(actionTypes.SET_SCROLL);
export const setPage = createAction(actionTypes.SET_PAGE);

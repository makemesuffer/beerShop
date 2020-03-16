const pending = state => {
  return { ...state, isBusy: true };
};

const success = (state, action) => {
  const newState = {
    isBusy: false,
    error: null
  };

  if (Array.isArray(action.payload)) {
    newState.items = action.payload;
  } else {
    newState.model = { ...state.model };
    for (const [key, value] of Object.entries(action.payload)) {
      newState.model[key] = value;
    }
  }
  return { ...state, ...newState };
};

const error = (state, action) => {
  const { error } = action.payload.response.data;

  return {
    ...state,
    isBusy: false,
    error
  };
};

const reset = state => {
  return {
    ...state,
    model: null,
    items: [],
    isBusy: false,
    error: null
  };
};

const setModel = (state, action) => {
  return {
    ...state,
    model: action.payload
  };
};

const setArray = (state, action) => {
  return {
    ...state,
    items: action.payload
  };
};

const continueArray = (state, action) => {
  return {
    ...state,
    isBusy: false,
    items: [...state.items, ...action.payload]
  };
};

export default {
  setArray,
  continueArray,
  pending,
  success,
  error,
  reset,
  setModel
};

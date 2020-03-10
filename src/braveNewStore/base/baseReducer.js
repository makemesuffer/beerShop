const pending = state => {
  return { ...state, isBusy: true };
};

const success = (state, action) => {
  const newState = {
    isBusy: false
  };

  if (Array.isArray(action.payload)) {
    newState.items = action.payload;
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(action.payload)) {
      newState.model[key] = value;
    }
  }

  return { ...state, ...newState };
};

const error = (state, action) => {
  const errorMsg = action.payload;

  return {
    ...state,
    isBusy: false,
    errorMsg
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

// TODO: возможен реврайт

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
    items: [...state.items, ...action.payload]
  };
};

const deleteFromArray = (state, action) => {
  return {
    ...state,
    items: state.items.filter(elem => elem !== action.payload)
  };
};

const addToArray = (state, action) => {
  return {
    ...state,
    items: state.items.push(action.payload)
  };
};

export default {
  setArray,
  continueArray,
  pending,
  success,
  error,
  reset,
  setModel,
  deleteFromArray,
  addToArray
};

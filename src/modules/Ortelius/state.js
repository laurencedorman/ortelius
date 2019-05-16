const initialState = {
  valueKey: null,
  isZoomed: false,
  highlighted: false
};

export function getInitialState(state) {
  return {
    ...initialState,
    ...state
  };
}

export const actions = {
  UPDATE_VALUE_KEY: 'UPDATE_VALUE_KEY'
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_VALUE_KEY:
      return { ...state, valueKey: action.valueKey };
    default:
      throw new Error();
  }
}

export const setValueKey = dispatch => valueKey =>
  dispatch({ type: actions.UPDATE_VALUE_KEY, valueKey });

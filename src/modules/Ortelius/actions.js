export const actions = {
  UPDATE_VALUE_KEY: 'UPDATE_VALUE_KEY'
};

export const setValueKey = dispatch => valueKey =>
  dispatch({ type: actions.UPDATE_VALUE_KEY, valueKey });

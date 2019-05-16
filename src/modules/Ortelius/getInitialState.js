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

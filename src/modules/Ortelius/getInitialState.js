const initialState = {
  valueKey: null,
  isZoomed: false,
  highlightedGeography: false,
  zoom: [0, 0, 1]
};

export function getInitialState(state) {
  return {
    ...initialState,
    ...state
  };
}

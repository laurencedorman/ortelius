const initialState = {
  valueKey: null,
  isZoomed: false,
  highlightedGeography: false,
  zoom: [0, 0, 1],
  isPanning: false,
  pan: { x: 0, y: 0 }
};

export function getInitialState(state) {
  return {
    ...initialState,
    ...state
  };
}

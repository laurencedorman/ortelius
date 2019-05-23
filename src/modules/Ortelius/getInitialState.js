export const initialState = {
  valueKey: null,
  isZoomed: false,
  highlightedGeography: false,
  zoom: { transform: [0, 0, 1], immediate: false },
  pan: { x: 0, y: 0 }
};

export function getInitialState(state) {
  return {
    ...initialState,
    ...state
  };
}

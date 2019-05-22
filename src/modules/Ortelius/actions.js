export const actionTypes = {
  UPDATE_VALUE_KEY: 'UPDATE_VALUE_KEY',
  SET_ZOOM: 'SET_ZOOM',
  RESET_ZOOM: 'RESET_ZOOM',
  SET_PAN: 'SET_PAN',
  SET_IS_PANNING: 'SET_IS_PANNING',
  SET_HIGHLIGHTED_GEOGRAPHY: 'SET_HIGHLIGHTED_GEOGRAPHY',
  RESET_HIGHLIGHTED_GEOGRAPHY: 'RESET_HIGHLIGHTED_GEOGRAPHY'
};

export default {
  setValueKey: dispatch => valueKey => dispatch({ type: actionTypes.UPDATE_VALUE_KEY, valueKey }),

  setZoom: dispatch => zoom => dispatch({ type: actionTypes.SET_ZOOM, zoom }),

  resetZoom: dispatch => () => dispatch({ type: actionTypes.RESET_ZOOM, zoom: [0, 0, 1] }),

  setPan: dispatch => pan => dispatch({ type: actionTypes.SET_PAN, pan }),

  setIsPanning: dispatch => isPanning => dispatch({ type: actionTypes.SET_IS_PANNING, isPanning }),

  setHighlightedGeography: dispatch => geography =>
    dispatch({ type: actionTypes.SET_HIGHLIGHTED_GEOGRAPHY, geography }),

  resetHighlightedGeography: dispatch => () =>
    dispatch({ type: actionTypes.RESET_HIGHLIGHTED_GEOGRAPHY })
};

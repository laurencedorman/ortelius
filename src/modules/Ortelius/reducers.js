import { actionTypes } from './actions';

export default function reducers(state, action) {
  // eslint-disable-next-line no-console
  // console.log(state, action);

  switch (action.type) {
    case actionTypes.UPDATE_VALUE_KEY:
      return { ...state, valueKey: action.valueKey };
    case actionTypes.SET_ZOOM:
      return { ...state, isPanning: false, isZoomed: true, zoom: action.zoom, pan: { x: 0, y: 0 } };
    case actionTypes.RESET_ZOOM:
      return { ...state, isZoomed: false, zoom: action.zoom };
    case actionTypes.SET_PAN:
      return { ...state, pan: action.pan };
    case actionTypes.SET_IS_PANNING:
      return { ...state, isPanning: action.isPanning };
    case actionTypes.SET_HIGHLIGHTED_GEOGRAPHY:
      return { ...state, highlightedGeography: action.geography };
    case actionTypes.RESET_HIGHLIGHTED_GEOGRAPHY:
      return { ...state, highlightedGeography: false };
    default:
      throw new Error();
  }
}

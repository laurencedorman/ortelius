import { actionTypes } from './actions';

export default function reducers(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_VALUE_KEY:
      return { ...state, valueKey: action.valueKey };
    case actionTypes.SET_ZOOM:
      return { ...state, isZoomed: true, zoom: action.zoom };
    case actionTypes.RESET_ZOOM:
      return { ...state, isZoomed: false, zoom: action.zoom };
    case actionTypes.SET_HIGHLIGHTED_GEOGRAPHY:
      return { ...state, highlightedGeography: action.geography };
    case actionTypes.RESET_HIGHLIGHTED_GEOGRAPHY:
      return { ...state, highlightedGeography: false };
    default:
      throw new Error();
  }
}

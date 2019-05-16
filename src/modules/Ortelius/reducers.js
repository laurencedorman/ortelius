import { actions } from './actions';

export default function reducers(state, action) {
  switch (action.type) {
    case actions.UPDATE_VALUE_KEY:
      return { ...state, valueKey: action.valueKey };
    default:
      throw new Error();
  }
}

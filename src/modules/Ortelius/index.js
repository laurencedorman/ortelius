import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { getDataById, getDisplayName } from 'utils';

import actions from './actions';
import { getInitialState } from './getInitialState';
import reducers from './reducers';

export const OrteliusContext = React.createContext({});

function prepareActions(actionFns, dispatch) {
  return Object.keys(actionFns).reduce((prepared, key) => {
    return {
      ...prepared,
      [key]: actionFns[key](dispatch)
    };
  }, {});
}

export default function withOrtelius(WrappedComponent) {
  function Ortelius({ series, ...passThroughProps }) {
    const { data, value: initialValueKey, joinBy, dateTime } = series;
    const [geoKey, seriesKey] = joinBy;

    const [state, dispatch] = useReducer(
      reducers,
      getInitialState({
        valueKey: dateTime ? dateTime.from : initialValueKey
      })
    );

    const preparedActions = prepareActions(actions, dispatch);

    const { valueKey } = state;

    const dataById = getDataById(data, valueKey, seriesKey);

    const context = {
      ...state,
      ...preparedActions
    };

    return React.createElement(
      OrteliusContext.Provider,
      {
        value: context
      },
      React.createElement(WrappedComponent, {
        dataById,
        geoKey,
        series,
        toolbar: dateTime,
        ...passThroughProps
      })
    );
  }

  Ortelius.propTypes = {
    series: PropTypes.arrayOf(Object).isRequired
  };

  Ortelius.displayName = `Ortelius(${getDisplayName(WrappedComponent)})`;

  return Ortelius;
}

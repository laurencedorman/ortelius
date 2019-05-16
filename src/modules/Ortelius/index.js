import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { getDataById, getDisplayName } from 'utils';

import { setValueKey } from './actions';
import { getInitialState } from './getInitialState';
import reducers from './reducers';

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

    const { valueKey } = state;

    const dataById = getDataById(data, valueKey, seriesKey);

    return React.createElement(WrappedComponent, {
      dataById,
      geoKey,
      series,
      toolbar: dateTime && {
        ...dateTime,
        activeValueKey: valueKey,
        onChange: setValueKey(dispatch)
      },
      ...passThroughProps
    });
  }

  Ortelius.propTypes = {
    series: PropTypes.arrayOf(Object).isRequired
  };

  Ortelius.displayName = `Ortelius(${getDisplayName(WrappedComponent)})`;

  return Ortelius;
}

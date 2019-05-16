import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { getDataById, getDisplayName } from 'utils';

import { getInitialState, reducer, setValueKey } from './state';

export default function withOrtelius(WrappedComponent) {
  function Ortelius({ series, ...passThroughProps }) {
    const { data, value: initialValueKey, joinBy, dateTime } = series;
    const [geoKey, seriesKey] = joinBy;

    const [state, dispatch] = useReducer(
      reducer,
      getInitialState({
        valueKey: dateTime ? dateTime.from : initialValueKey
      })
    );

    const { valueKey } = state;

    const dataById = getDataById(data, valueKey, seriesKey);

    return (
      <WrappedComponent
        toolbar={
          dateTime && {
            ...dateTime,
            activeValueKey: valueKey,
            onChange: newValueKey => {
              setValueKey(dispatch)(newValueKey);
            }
          }
        }
        geoKey={geoKey}
        dataById={dataById}
        series={series}
        {...passThroughProps}
      />
    );
  }

  Ortelius.displayName = `Ortelius(${getDisplayName(WrappedComponent)})`;

  return Ortelius;
}

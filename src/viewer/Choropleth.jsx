import React from 'react';
import PropTypes from 'prop-types';

import MapFactory from './MapFactory';
import Geography from 'viewer/shared/Geography';

import createColorScale from 'utils/createColorScale';
import { castToFloat } from 'utils/prepareData';

export default function Choropleth({ series, ...restOfProps }) {
  const { value, joinBy } = series;
  const [geoKey, seriesKey] = joinBy;
  let { data } = series;

  data = data.map(datum => ({
    ...datum,
    value: castToFloat(datum[value], datum[seriesKey])
  }));

  const dataById = data.reduce((dict, datum) => {
    return {
      ...dict,
      [datum[seriesKey]]: datum
    };
  }, {});

  const colorScale = createColorScale(data);

  const fillFunction = geography => {
    if (Object.prototype.hasOwnProperty.call(dataById, geography[geoKey])) {
      return colorScale(dataById[geography[geoKey]].value);
    }

    return 'transparent';
  };

  return (
    <MapFactory {...restOfProps}>
      {({ geographies, path, projection }) =>
        geographies.map(geography => {
          const fillInitial = fillFunction(geography);
          return (
            <Geography
              key={geography.id}
              geography={geography}
              path={path}
              projection={projection}
              fillInitial={fillInitial}
            />
          );
        })
      }
    </MapFactory>
  );
}

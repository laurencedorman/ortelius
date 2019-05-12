import React from 'react';
import PropTypes from 'prop-types';

import MapFactory from './MapFactory';
import Geography from 'viewer/shared/Geography';

import createColorScale from 'utils/createColorScale';
import { castToFloat } from 'utils/prepareData';

export default function Choropleth({ series, legend, ...restOfProps }) {
  const { data, value, joinBy, scale } = series;
  const [geoKey, seriesKey] = joinBy;

  const dataById = data.reduce(
    (dict, datum) => ({
      ...dict,
      [datum[seriesKey]]: {
        ...datum,
        value: castToFloat(datum[value], datum[seriesKey])
      }
    }),
    {}
  );

  const colorScale = createColorScale(scale, dataById);

  const legendConfig = legend ? { scale: colorScale } : undefined;

  const fillFunction = geography => {
    if (Object.prototype.hasOwnProperty.call(dataById, geography[geoKey])) {
      return colorScale(dataById[geography[geoKey]].value);
    }
  };

  return (
    <MapFactory legend={legendConfig} {...restOfProps}>
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

import React from 'react';
import PropTypes from 'prop-types';

import MapFactory from 'components/MapFactory';
import Geography from 'components/Geography';

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

  const legendConfig = legend ? { ...legend, scale: colorScale } : undefined;

  const fillFunction = geography => {
    if (Object.prototype.hasOwnProperty.call(dataById, geography[geoKey])) {
      return colorScale(dataById[geography[geoKey]].value);
    }
  };

  return (
    <MapFactory
      legend={legendConfig}
      series={series}
      geoKey={geoKey}
      seriesKey={seriesKey}
      dataById={dataById}
      {...restOfProps}
    >
      {({ geographies, path, projection }) =>
        geographies.map(geography => {
          const datum = Object.prototype.hasOwnProperty.call(dataById, geography[geoKey])
            ? dataById[geography[geoKey]]
            : undefined;
          const fillInitial = fillFunction(geography);

          return (
            <Geography
              key={geography.id}
              data={datum}
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

Choropleth.propTypes = {
  series: PropTypes.arrayOf(Object).isRequired,
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(String)
  })
};

Choropleth.defaultProps = {
  legend: undefined
};
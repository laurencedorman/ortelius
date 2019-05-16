import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Map, Geography } from 'components';
import { createColorScale } from 'utils';

import Ortelius from '../Ortelius';

export function Choropleth({ dataById, series, legend, ...passThroughProps }) {
  const { joinBy, scale } = series;
  const [geoKey] = joinBy;

  const colorScale = createColorScale(scale, dataById);

  const legendConfig = legend ? { ...legend, scale: colorScale } : undefined;

  const fillFunction = (geography, highlightedGeography) => {
    if (highlightedGeography && geography[geoKey] === highlightedGeography[geoKey]) {
      return '#fafa';
    }

    if (Object.prototype.hasOwnProperty.call(dataById, geography[geoKey])) {
      return colorScale(dataById[geography[geoKey]].value);
    }

    return undefined;
  };

  return (
    <Map
      legend={legendConfig}
      series={series}
      geoKey={geoKey}
      dataById={dataById}
      {...passThroughProps}
      render={({ geographies, path, projection, highlightedGeography }) => {
        return geographies.map(geography => {
          const datum = Object.prototype.hasOwnProperty.call(dataById, geography[geoKey])
            ? dataById[geography[geoKey]]
            : undefined;
          const fillInitial = fillFunction(geography, highlightedGeography);

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
        });
      }}
    />
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

export default Ortelius(Choropleth);

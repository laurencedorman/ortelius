import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Map, Geography } from 'components';
import { createColorScale } from 'utils';

import Ortelius, { OrteliusContext } from '../Ortelius';

export function Choropleth({ dataById, series, legend, ...passThroughProps }) {
  const { highlightedGeography } = useContext(OrteliusContext);

  const { joinBy, scale } = series;
  const [geoKey, seriesKey] = joinBy;

  const colorScale = createColorScale(scale, dataById);

  const legendConfig = legend ? { ...legend, scale: colorScale } : undefined;

  const fillFunction = geography => {
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
      seriesKey={seriesKey}
      geoKey={geoKey}
      dataById={dataById}
      {...passThroughProps}
      render={({ geographies, path, projection }) => {
        return geographies.map(geography => {
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
        });
      }}
    />
  );
}

Choropleth.propTypes = {
  dataById: PropTypes.arrayOf(Object),
  series: PropTypes.arrayOf(Object).isRequired,
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(String)
  })
};

Choropleth.defaultProps = {
  legend: undefined
};

export default Ortelius(Choropleth);

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MapFactory from 'components/MapFactory';
import Geography from 'components/Geography';

import castToFloat from 'utils/castToFloat';
import createColorScale from 'utils/createColorScale';

const dataByIdCache = {};

function setDataById(data, valueKey, seriesKey) {
  if (dataByIdCache[valueKey]) {
    return dataByIdCache[valueKey];
  }

  const dataById = data.reduce((dict, datum) => {
    return {
      ...dict,
      [datum[seriesKey]]: {
        ...datum,
        value: castToFloat(datum[valueKey], datum[seriesKey])
      }
    };
  }, {});

  dataByIdCache[valueKey] = dataById;

  return dataByIdCache[valueKey];
}

export default function Choropleth({ series, legend, ...restOfProps }) {
  const { data, value: valueKey, joinBy, dateTime, scale } = series;
  const [geoKey, seriesKey] = joinBy;
  let toolbarProps = null;

  const initialValueKey = dateTime ? dateTime.from : valueKey;
  const [dataById, updateDataById] = useState(setDataById(data, initialValueKey, seriesKey));

  if (dateTime) {
    toolbarProps = {
      ...dateTime,
      onChange: newValueKey => {
        updateDataById(setDataById(data, newValueKey, seriesKey));
      }
    };
  }

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
    <MapFactory
      legend={legendConfig}
      series={series}
      geoKey={geoKey}
      seriesKey={seriesKey}
      dataById={dataById}
      {...restOfProps}
      toolbar={toolbarProps}
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

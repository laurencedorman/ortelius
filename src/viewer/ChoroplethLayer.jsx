import React from 'react';
import PropTypes from 'prop-types';

import createColorScale from 'utils/createColorScale';
import prepareData from 'utils/prepareData';

import Feature from './Feature';

export function joinDataToFeatures(geoFeatures, data) {
  const dataById = data.reduce((dict, datum) => {
    return {
      ...dict,
      [datum.id]: datum
    };
  }, {});

  return geoFeatures.map(({ id, ...rest }) => {
    return {
      data: dataById[id],
      id,
      ...rest
    };
  });
}

export default function ChoroplethLayer({ data: rawData, columnNames, dataType, geoFeatures }) {
  const data = prepareData(dataType, columnNames, rawData);
  const colorScale = createColorScale(data);

  const joinedGeoFeatures = joinDataToFeatures(geoFeatures, data);

  return (
    <g className="choropleth-layer">
      {joinedGeoFeatures.map(({ id, ...rest }) => {
        const initialFill = rest.data && colorScale(rest.data.value);

        return <Feature key={id} {...rest} initialFill={initialFill} />;
      })}
    </g>
  );
}

ChoroplethLayer.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  dataType: PropTypes.string,
  columnNames: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string
  }),
  geoFeatures: PropTypes.arrayOf(Object).isRequired
};

ChoroplethLayer.defaultProps = {
  dataType: 'csv',
  columnNames: {
    id: 'id',
    value: 'value'
  }
};

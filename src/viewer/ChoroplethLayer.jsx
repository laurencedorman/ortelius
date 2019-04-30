import React from 'react';
import PropTypes from 'prop-types';

import createColorScale from 'utils/createColorScale';

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

export default function ChoroplethLayer({ data, geoFeatures }) {
  const colorScale = createColorScale(data);

  const joinedGeoFeatures = joinDataToFeatures(geoFeatures, data);

  return (
    <g className="choropleth-layer">
      {joinedGeoFeatures.map(({ id, ...rest }) => {
        const fillInitial = rest.data && colorScale(rest.data.value);

        return <Feature key={id} {...rest} fillInitial={fillInitial} />;
      })}
    </g>
  );
}

ChoroplethLayer.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  geoFeatures: PropTypes.arrayOf(Object).isRequired
};

ChoroplethLayer.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';

import Feature from 'viewer/shared/Feature';

import createColorScale from 'utils/createColorScale';

export default function Choropleth({ data, joinedGeoFeatures }) {
  const colorScale = createColorScale(data);

  return joinedGeoFeatures.map(feature => {
    const fillInitial = feature.data && colorScale(feature.data.value);

    return <Feature key={feature.id} {...feature} fillInitial={fillInitial} />;
  });
}

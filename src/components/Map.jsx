import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

import {
  geoPath,
  geoMercator,
} from 'd3-geo';

import GeoFeature from './GeoFeature';

const Map = ({ geojson, projection = geoMercator(), height, width}) => {
  const animProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const path = geoPath().projection(projection.fitExtent([
    [0, 0],
    [width, height],
  ], geojson));

  const paths = geojson.features.map(feature => ({
    d: path(feature),
    bounds: path.bounds(feature),
  }));

  return (
    <div>
      <svg
        width={width}
        height={height - 40}
      >
        <animated.g opacity={animProps.opacity}>
          {paths.map(({ bounds, d }) => (
            <GeoFeature bounds={bounds} key={d} path={d} />
          ))}
        </animated.g>
      </svg>
    </div>
  );
};

export default Map;

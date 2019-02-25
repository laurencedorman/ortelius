import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

import {
  geoPath,
  geoMercator,
} from 'd3-geo';

import GeoFeature from './GeoFeature';

const Map = ({ geojson, projection = geoMercator(), height, width}) => {
  const [{ transform }, set] = useSpring(() => ({
    transform: [0, 0, 1],
  }));

  const path = geoPath().projection(projection.fitExtent([
    [0, 0],
    [width, height],
  ], geojson));

  const paths = geojson.features.map(feature => ({
    d: path(feature),
    bounds: path.bounds(feature),
  }));

  const onClick = (bounds) => {
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    set({
      transform: [...translate, scale],
    });

    setTimeout(() => {
      set({
        transform: [0, 0, 1],
      });
    }, 3000)
  };

  return (
    <div>
      <svg
        width={width}
        height={height - 40}
      >
        <animated.g 
          transform={
            transform.interpolate((x, y, s) => (`translate(${x},${y}) scale(${s})`))
          }
        >
          {paths.map(({ bounds, d }) => (
            <GeoFeature bounds={bounds} onClick={onClick} key={d} path={d} />
          ))}
        </animated.g>
      </svg>
    </div>
  );
};

export default Map;

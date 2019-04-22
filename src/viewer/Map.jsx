import React from 'react';

import { geoPath, geoMercator } from 'd3-geo';

import Feature from './Feature';

const createGeoPath = ({ projection, width, height, geojson }) => {
  return geoPath().projection(projection.fitExtent([[0, 0], [width, height]], geojson));
};

const Map = ({ geojson, projection = geoMercator(), height, width }) => {
  const path = createGeoPath({
    width,
    height,
    geojson,
    projection
  });

  const paths = geojson.features.map(feature => ({
    d: path(feature),
    bounds: path.bounds(feature)
  }));

  return (
    <div>
      <svg width={width} height={height}>
        <g>
          {paths.map(({ bounds, d }) => (
            <Feature bounds={bounds} key={d} path={d} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Map;

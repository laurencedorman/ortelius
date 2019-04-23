import React from 'react';
import { feature as topo2geo } from 'topojson';
import { geoPath as d3GeoPath, geoMercator } from 'd3-geo';

import Feature from './Feature';

const createGeoPath = ({ projection, width, height, geojson }) => {
  return d3GeoPath().projection(projection.fitExtent([[0, 0], [width, height]], geojson));
};

const Map = ({ topoJson, projection = geoMercator(), height, width }) => {
  const topoJsonKey = Object.keys(topoJson.objects)[0];
  const geojson = topo2geo(topoJson, topoJson.objects[topoJsonKey]);

  const geoPath = createGeoPath({
    width,
    height,
    geojson,
    projection
  });

  const features = geojson.features.map(feature => {
    const { properties, id } = feature;

    return {
      id,
      properties,
      path: geoPath(feature),
      bounds: geoPath.bounds(feature)
    };
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g>
          {features.map(({ id, ...rest }) => (
            <Feature key={id} {...rest} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Map;

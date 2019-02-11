import React from 'react';
import { render } from 'react-dom';

import {
  geoPath,
  geoMercator,
} from 'd3-geo';

const rawWidth = document.documentElement.clientWidth;
const rawHeight = document.documentElement.clientHeight;

const Path = ({ path, id }) => {
  const alertId = (id) => {
    alert(id);
  };

  return (
    <path onClick={alertId.bind(null, id)} d={path} />
  );
};

const Map = ({ geojson, projection, height, width }) => {
  const path = geoPath().projection(projection.fitExtent([
    [0, 0],
    [width, height],
  ], geojson));

  const renderPath = datum => (
    <Path
      key={datum.properties.code}
      id={datum.properties.code}
      path={path(datum)}
    />
  );

  return (
    <div>
      <svg width={width} height={height}>
        <g transform="translate(0,0)">
          {geojson.features.map(renderPath)}
        </g>
      </svg>
    </div>
  );
};

fetch('./france-departements-simplified.geojson')
  .then(res => res.json())
  .then((geojson) => {
    render(
      <Map
        geojson={geojson}
        projection={geoMercator()}
        height={rawHeight}
        width={rawWidth}
      />,
      document.getElementById('root'),
    );
  });

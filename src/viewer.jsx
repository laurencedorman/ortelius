import React from 'react';
import { render } from 'react-dom';
import { useSpring, animated, config } from 'react-spring';

import {
  geoPath,
  geoMercator,
} from 'd3-geo';

const rawWidth = document.documentElement.clientWidth;
const rawHeight = document.documentElement.clientHeight;

const Path = ({ path, id }) => {
  return (
    <path d={path} />
  );
};

const Map = ({ geojson, projection,height, width}) => {
  const props = useSpring({
    transform: 'translate(0,0) scale(0.2)',
    from: {
      transform: 'translate(0,0) scale(1)',
    },
    config: config.default,
  });

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
  console.log(props.scale);
  return (
    <div>
      <svg
        width={width}
        height={height}
        // onMouseDown={this.onDragStart.bind(this)}
        // onTouchStart={this.onDragStart.bind(this)}
        // onMouseMove={this.onDragMove.bind(this)}
        // onTouchMove={this.onDragMove.bind(this)}
        // onMouseUp={this.onDragEnd.bind(this)}
        // onWheel={this.onWheel.bind(this)}
      >
        <animated.g transform={props.transform}>
          {geojson.features.map(renderPath)}
        </animated.g>
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

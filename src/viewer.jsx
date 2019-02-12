import React, { useState } from 'react';
import { render } from 'react-dom';
import { useSpring, animated, config } from 'react-spring';

import {
  geoPath,
  geoMercator,
} from 'd3-geo';

// https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate

const rawWidth = document.documentElement.clientWidth;
const rawHeight = document.documentElement.clientHeight;

const Path = ({ path, id }) => {
  return (
    <path d={path} />
  );
};

const Map = ({ geojson, projection,height, width}) => {
  const [count, setCount] = useState(0);

  const [props, set] = useSpring(() => ({
    transform: 'translate(0,0) scale(0.9)',
    from: {
      transform: 'translate(0,0) scale(1)',
    },
    config: config.default,
  }))
  
  set({ opacity: toggle ? 1 : 0 });
  set({ transform: toggle ? 'translate(0,0) scale(0.9)' });

  const props = useSpring({
    transform: 'translate(0,0) scale(0.9)',
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
  
  // console.log(props.scale);

  const zoomIn = () => {
    debugger;
    setCount(count * 0.9);
  };

  const zoomOut = () => {

  };

  const { transform } = props;

  return (
    <div>
      <svg
        width={width}
        height={height - 40}
        // onMouseDown={this.onDragStart.bind(this)}
        // onTouchStart={this.onDragStart.bind(this)}
        // onMouseMove={this.onDragMove.bind(this)}
        // onTouchMove={this.onDragMove.bind(this)}
        // onMouseUp={this.onDragEnd.bind(this)}
        // onWheel={this.onWheel.bind(this)}
      >
        <animated.g transform={transform}>
          {geojson.features.map(renderPath)}
        </animated.g>
      </svg>
      <button onClick={zoomIn.bind(this)}>Zoom In</button>
      {/* <button onClick={zoomOut.bind(this)}>Zoom out</button> */}
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

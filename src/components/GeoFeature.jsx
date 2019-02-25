import React, { useState } from 'react';
import { useSpring, animated, config, interpolate } from 'react-spring';

const GeoFeature = ({ bounds, path }) => {
  let pathElem = null;
  
  const [props, set] = useSpring(() => ({
    fill: 'black',
    scale: 1,
  }));

  const onMouseOver = () => {
    console.log(bounds);
    debugger;

    var dx = bounds[1][0] - bounds[0][0];
    var dy = bounds[1][1] - bounds[0][1];
    var x = (bounds[0][0] + bounds[1][0]) / 2;
    var y = (bounds[0][1] + bounds[1][1]) / 2;
    var scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
    var translate = [width / 2 - scale * x, height / 2 - scale * y];

    set({
      fill: 'yellow',
      scale: 1.1,
    });

    setTimeout(() => {
      set({
        fill: 'black',
        scale: 1,
      });
    }, 300);
  };

  const { fill, scale } = props;

  return (
    <animated.path
      ref={(path) => { pathElem = path; }} 
      fill={fill}
      transform={scale.interpolate(x => `scale(${x})`)}
      onFocus={onMouseOver}
      onMouseOver={onMouseOver}
      d={path}
    />
  );
};

export default GeoFeature;

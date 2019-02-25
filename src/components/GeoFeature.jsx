import React, { useState } from 'react';
import { useSpring, animated, config, interpolate } from 'react-spring';

const GeoFeature = ({ bounds, path, onClick }) => {
  return (
    <animated.path
      onClick={onClick.bind(null, bounds)}
      d={path}
    />
  );
};

export default GeoFeature;

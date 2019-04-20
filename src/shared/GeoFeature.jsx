import React from 'react';
import { animated } from 'react-spring';

const GeoFeature = ({ bounds, path, onClick }) => {
  return <animated.path onClick={onClick.bind(null, bounds)} d={path} />;
};

export default GeoFeature;

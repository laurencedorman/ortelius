import React from 'react';
import PropTypes from 'prop-types';

export default function Feature({ path, fill, stroke }) {
  return <path d={path} fill={fill} stroke={stroke} />;
}

Feature.propTypes = {
  fill: PropTypes.string,
  path: PropTypes.string.isRequired,
  stroke: PropTypes.string
};

Feature.defaultProps = {
  fill: '#ccc',
  stroke: '#000'
};

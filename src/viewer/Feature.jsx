import React from 'react';
import PropTypes from 'prop-types';

const Feature = ({ path }) => {
  return <path d={path} />;
};

Feature.propTypes = {
  path: PropTypes.string.isRequired
};

export default Feature;

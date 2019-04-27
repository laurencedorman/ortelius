import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Feature({ path, initialFill, stroke }) {
  const [fill, setFill] = useState(initialFill);

  const onMouseEnter = e => {
    e.preventDefault();

    setFill('yellow');
  };

  const onMouseLeave = e => {
    e.preventDefault();

    setFill(initialFill);
  };

  return (
    <path
      d={path}
      fill={fill}
      stroke={stroke}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    />
  );
}

Feature.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  initialFill: PropTypes.string,
  path: PropTypes.string.isRequired,
  stroke: PropTypes.string
};

Feature.defaultProps = {
  data: null,
  initialFill: '#ccc',
  stroke: '#000'
};

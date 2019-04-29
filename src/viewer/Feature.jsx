import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ZoomContext } from './ZoomableGroup';

export default function Feature({ bounds, path, fillInitial, fillHover, stroke }) {
  const [fill, setFill] = useState(fillInitial);
  const { handleZoomClick } = useContext(ZoomContext);

  const onMouseEnter = e => {
    e.preventDefault();

    setFill(fillHover);
  };

  const onMouseLeave = e => {
    e.preventDefault();

    setFill(fillInitial);
  };

  return (
    <path
      d={path}
      fill={fill}
      stroke={stroke}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={handleZoomClick.bind(null, bounds)}
    />
  );
}

Feature.propTypes = {
  bounds: PropTypes.arrayOf(PropTypes.array).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  fillHover: PropTypes.string,
  fillInitial: PropTypes.string,
  path: PropTypes.string.isRequired,
  stroke: PropTypes.string
};

Feature.defaultProps = {
  data: null,
  fillHover: 'yellow',
  fillInitial: '#ccc',
  stroke: '#000'
};

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { ZoomContext } from './ZoomableGroup';

export function Feature({ bounds, path, fillInitial, fillHover, stroke }) {
  const [props, setFill] = useSpring(() => ({ fill: fillInitial }));
  const { handleZoomClick } = useContext(ZoomContext);

  const onMouseEnter = e => {
    e.preventDefault();

    setFill({ fill: fillHover });
  };

  const onMouseLeave = e => {
    e.preventDefault();

    setFill({ fill: fillInitial });
  };

  return (
    <animated.path
      d={path}
      style={props}
      stroke={stroke}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={handleZoomClick.bind(null, bounds)}
    />
  );
}

export default React.memo(Feature);

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

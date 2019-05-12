import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { ZoomContext } from './ZoomableGroup';

import styles from './Geography.module';

export function Geography({ path, projection, fillInitial, fillHover, stroke, geography }) {
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

  const drawn = path(geography);
  const bounds = path.bounds(geography);

  return (
    <animated.path
      d={drawn}
      className={styles.Geography}
      style={props}
      stroke={stroke}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={handleZoomClick.bind(null, bounds)}
    />
  );
}

export default React.memo(Geography);

Geography.propTypes = {
  // bounds: PropTypes.arrayOf(PropTypes.array).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  fillHover: PropTypes.string,
  fillInitial: PropTypes.string,
  // path: PropTypes.string.isRequired,
  stroke: PropTypes.string
};

Geography.defaultProps = {
  data: null,
  fillHover: 'yellow',
  fillInitial: '#ccc',
  stroke: '#000'
};

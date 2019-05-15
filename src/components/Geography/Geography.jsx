import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { ZoomContext } from 'components/ZoomableGroup';

import styles from './Geography.module';

export function Geography({ path, projection, fillInitial, fillHover, stroke, geography, data }) {
  const [style, setFill] = useSpring(() => ({ fill: fillInitial }));
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
      style={style}
      stroke={stroke}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={handleZoomClick.bind(null, { bounds, geography, data })}
    />
  );
}

export default Geography;

Geography.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  fillHover: PropTypes.string,
  fillInitial: PropTypes.string,
  path: PropTypes.func.isRequired,
  stroke: PropTypes.string
};

Geography.defaultProps = {
  data: null,
  fillHover: '#fafa',
  fillInitial: '#ccc',
  stroke: '#000'
};

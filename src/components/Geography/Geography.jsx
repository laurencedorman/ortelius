import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { ZoomContext } from 'components';

import styles from './Geography.module.scss';

export function Geography({ path, fillInitial, fillHover, stroke, geography, data }) {
  const { handleZoomClick } = useContext(ZoomContext);

  const [isHover, toggleHover] = useState(false);
  const style = useSpring({ fill: isHover ? fillHover : fillInitial });

  const onMouseEnter = e => {
    e.preventDefault();

    toggleHover(true);
  };

  const onMouseLeave = e => {
    e.preventDefault();

    toggleHover(false);
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
      onDoubleClick={handleZoomClick.bind(null, { bounds, geography, data })}
    />
  );
}

Geography.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  geography: PropTypes.shape({
    geometry: PropTypes.shape({
      type: PropTypes.string
    }),
    type: PropTypes.string
  }).isRequired,
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

export default React.memo(Geography);

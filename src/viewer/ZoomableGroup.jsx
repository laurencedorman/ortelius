import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import zoomToBoundingBox from 'utils/zoomToBoundingBox';

export const ZoomContext = React.createContext({});

export default function ZoomableGroup({ height, width, children }) {
  const [{ zoomTransform }, setZoomTransform] = useSpring(() => ({
    zoomTransform: [0, 0, 1]
  }));

  const handleZoomClick = bounds =>
    setZoomTransform({
      zoomTransform: zoomToBoundingBox({ bounds, width, height })
    });

  return (
    <ZoomContext.Provider value={{ handleZoomClick }}>
      <animated.g
        transform={zoomTransform.interpolate((x, y, s) => `translate(${x},${y}) scale(${s})`)}
        className="zoomable-group"
      >
        {children}
      </animated.g>
    </ZoomContext.Provider>
  );
}

ZoomableGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

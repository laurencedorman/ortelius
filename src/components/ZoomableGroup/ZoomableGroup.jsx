import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { zoomToBoundingBox } from 'utils';

import { OrteliusContext } from 'modules';

import styles from './ZoomableGroup.module';

export const ZoomContext = React.createContext({});

export function ZoomToggle({ onClick, containerRef }) {
  return ReactDOM.createPortal(
    <button type="button" className={styles.ZoomToggle} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
        <path d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z" />
      </svg>
    </button>,
    containerRef.current
  );
}

export default function ZoomableGroup({ height, width, containerRef, children }) {
  const {
    isZoomed,
    zoom,
    setHighlightedGeography,
    setZoom,
    resetZoom,
    resetHighlightedGeography
  } = useContext(OrteliusContext);

  const zoomTransform = useSpring({ transform: zoom });

  const handleZoomClick = ({ bounds, geography, data }) => {
    setZoom(zoomToBoundingBox({ bounds, width, height }));
    setHighlightedGeography({ ...geography, ...data });
  };

  const handleToggleClick = () => {
    resetZoom();
    resetHighlightedGeography();
  };

  return (
    <ZoomContext.Provider value={{ handleZoomClick }}>
      {isZoomed && <ZoomToggle onClick={handleToggleClick} containerRef={containerRef} />}
      <animated.g
        transform={zoomTransform.transform.interpolate(
          (x, y, s) => `translate(${x},${y}) scale(${s})`
        )}
        className="zoomable-group"
      >
        {children}
      </animated.g>
    </ZoomContext.Provider>
  );
}

ZoomableGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

ZoomableGroup.defaultProps = {
  containerRef: undefined
};

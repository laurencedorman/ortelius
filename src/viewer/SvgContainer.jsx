import React from 'react';
import PropTypes from 'prop-types';

export default function SvgContainer({ width, height, margin, children }) {
  return (
    <svg width={width} height={height}>
      <g className="map-container" transform={`translate(${margin},${margin})`}>
        {children}
      </g>
    </svg>
  );
}

SvgContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

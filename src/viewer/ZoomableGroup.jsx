import React from 'react';
import PropTypes from 'prop-types';

export default function ZoomableGroup({ children }) {
  return (
    <g className="zoomable-group" transform="translate(0,0)">
      {children}
    </g>
  );
}

ZoomableGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

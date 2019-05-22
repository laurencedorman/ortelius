import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { OrteliusContext } from 'modules';

const PannableGroup = ({ children, height, width }) => {
  const { zoom } = useContext(OrteliusContext);

  const [isPanning, setIsPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [zoom]);

  const startPan = e => {
    e.preventDefault();
    setIsPanning(true);

    setOffset({
      x: e.pageX,
      y: e.pageY
    });
  };

  const updatePan = e => {
    e.preventDefault();

    if (!isPanning) {
      return;
    }

    const xDiff = offset.x - e.pageX;
    const yDiff = offset.y - e.pageY;

    setOffset({
      x: e.pageX,
      y: e.pageY
    });

    setPan({
      x: pan.x - xDiff,
      y: pan.y - yDiff
    });
  };

  const endPan = e => {
    e.preventDefault();
    setIsPanning(false);

    setOffset({
      x: 0,
      y: 0
    });
  };

  return (
    <g
      className="pannable-group"
      onMouseDown={startPan}
      onMouseMove={updatePan}
      onMouseUp={endPan}
      onMouseLeave={endPan}
      transform={`translate(${pan.x},${pan.y})`}
    >
      <rect width={width} height={height} fill="rgba(0,0,0,0)" />
      <g className="pannable-group-children">{children}</g>
    </g>
  );
};

PannableGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default React.memo(PannableGroup);

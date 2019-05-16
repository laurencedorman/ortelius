import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { GeographyProvider, Legend, Toolbar, Tooltip, ZoomableGroup } from 'components';

import { d3, getDrawDims } from 'utils';

const Annotations = () => null;
const Markers = () => null;

export default function Map({
  margin,
  geoAssets,
  projection,
  legend,
  seriesKey,
  toolbar,
  render,
  tooltip
}) {
  const containerEl = useRef(null);
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin, toolbar);

  const annotations = false;
  const markers = false;

  return (
    <div className="container" ref={containerEl}>
      <svg width={clientWidth} height={clientHeight}>
        <g className="map-container" transform={`translate(${margin},${margin})`}>
          <GeographyProvider
            height={drawHeight}
            width={drawWidth}
            projection={projection}
            {...geoAssets}
            render={geographyProps => (
              <ZoomableGroup containerRef={containerEl} height={drawHeight} width={drawWidth}>
                {render({ ...geographyProps })}
                {annotations && <Annotations annotations={annotations} />}
                {markers && <Markers markers={markers} />}
              </ZoomableGroup>
            )}
          />
        </g>
      </svg>
      {toolbar && <Toolbar {...toolbar} margin={margin} width={drawWidth} />}
      {legend && <Legend {...legend} />}
      {tooltip && tooltip.formatter && <Tooltip formatter={tooltip.formatter} />}
    </div>
  );
}

Map.propTypes = {
  margin: PropTypes.number,
  geoAssets: PropTypes.shape({
    url: PropTypes.string.isRequired,
    filter: PropTypes.func
  }).isRequired,
  projection: PropTypes.func,
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(String)
  }),
  render: PropTypes.func.isRequired,
  toolbar: PropTypes.object,
  tooltip: PropTypes.shape({
    formatter: PropTypes.func
  }),
  seriesKey: PropTypes.string.isRequired
};

Map.defaultProps = {
  legend: undefined,
  margin: 10,
  projection: d3.geoMercator(),
  tooltip: undefined
};

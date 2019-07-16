import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  GeographyProvider,
  Legend,
  PannableGroup,
  Toolbar,
  Tooltip,
  ZoomableGroup
} from 'components';

import { d3, getDrawDims } from 'utils';
import { useDocumentDimensions } from 'hooks';

const Annotations = () => null;
const Markers = () => null;

export default function Map({
  margin,
  height,
  width,
  geoAssets,
  projection,
  legend,
  toolbar,
  render,
  tooltip
}) {
  const containerEl = useRef(null);
  const dimensions = useDocumentDimensions({ height, width });

  const { drawHeight, drawWidth } = getDrawDims(
    dimensions.height,
    dimensions.width,
    margin,
    toolbar
  );

  const annotations = false;
  const markers = false;

  return (
    <div className="container" ref={containerEl}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g className="map-container" transform={`translate(${margin},${margin})`}>
          <GeographyProvider
            height={drawHeight}
            width={drawWidth}
            projection={projection}
            {...geoAssets}
            render={geographyProps => (
              <PannableGroup height={drawHeight} width={drawWidth}>
                <ZoomableGroup containerRef={containerEl} height={drawHeight} width={drawWidth}>
                  {render({ ...geographyProps })}
                  {annotations && <Annotations annotations={annotations} />}
                  {markers && <Markers markers={markers} />}
                </ZoomableGroup>
              </PannableGroup>
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
  legend: PropTypes.oneOfType([ 
    PropTypes.bool,
    PropTypes.shape({
      labels: PropTypes.arrayOf(String)
    })
  ]),
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
  toolbar: undefined,
  tooltip: undefined
};

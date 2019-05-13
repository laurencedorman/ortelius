import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import GeographyProvider from 'viewer/shared/GeographyProvider';
import Legend from 'viewer/shared/Legend';
import Toolbar from 'viewer/shared/Toolbar';
import Tooltip from 'viewer/shared/Tooltip';
import SvgContainer from 'viewer/shared/SvgContainer';
import ZoomableGroup from 'viewer/shared/ZoomableGroup';

import * as d3 from 'utils/d3-custom';
import getDrawDims from 'utils/getDrawDims';

const Annotations = () => null;
const Markers = () => null;

export default function MapFactory({
  margin = 10,
  geoAssets,
  projection = d3.geoMercator(),
  legend,
  series,
  children
}) {
  const containerEl = useRef(null);
  const [tooltip, setTooltip] = useState(false);
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  const annotations = false;
  const markers = false;

  const handleZoom = ({ isZoomed, geography, data }) => {
    if (isZoomed) {
      setTooltip({ title: data.Région, valueLabel: series.value, value: data.value });
    } else {
      setTooltip(false);
    }
  };

  return (
    <div className="container" ref={containerEl}>
      <SvgContainer margin={margin} height={clientHeight} width={clientWidth}>
        <GeographyProvider
          height={drawHeight}
          width={drawWidth}
          projection={projection}
          {...geoAssets}
          render={geographyProps => (
            <ZoomableGroup
              containerRef={containerEl}
              onZoom={handleZoom}
              height={drawHeight}
              width={drawWidth}
            >
              {children({ ...geographyProps })}
              {annotations && <Annotations annotations={annotations} />}
              {markers && <Markers markers={markers} />}
            </ZoomableGroup>
          )}
        />
        {legend && <Legend {...legend} />}
      </SvgContainer>
      <Toolbar />
      {tooltip && <Tooltip {...tooltip} />}
    </div>
  );
}

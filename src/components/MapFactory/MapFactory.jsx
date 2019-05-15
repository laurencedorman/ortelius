import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import GeographyProvider from 'components/GeographyProvider';
import Legend from 'components/Legend';
import Toolbar from 'components/Toolbar';
import Tooltip from 'components/Tooltip';
import SvgContainer from 'components/SvgContainer';
import ZoomableGroup from 'components/ZoomableGroup';

import d3 from 'utils/d3-custom';
import getDrawDims from 'utils/getDrawDims';

const Annotations = () => null;
const Markers = () => null;

export default function MapFactory({
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
  const [tooltipItems, setTooltipItems] = useState(false);
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  const annotations = false;
  const markers = false;

  const handleZoom = ({ isZoomed, geography, data }) => {
    if (isZoomed && tooltip && tooltip.formatter) {
      setTooltipItems(tooltip.formatter(geography, data, seriesKey));
    } else {
      setTooltipItems(false);
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
              {render({ ...geographyProps })}
              {annotations && <Annotations annotations={annotations} />}
              {markers && <Markers markers={markers} />}
            </ZoomableGroup>
          )}
        />
      </SvgContainer>
      {toolbar && <Toolbar {...toolbar} />}
      {legend && <Legend {...legend} />}
      {tooltipItems && <Tooltip items={tooltipItems} />}
    </div>
  );
}

MapFactory.propTypes = {
  margin: PropTypes.number,
  geoAssets: PropTypes.shape({
    url: PropTypes.string.isRequired,
    filter: PropTypes.func
  }).isRequired,
  projection: PropTypes.func,
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(String)
  }),
  renderGeographies: PropTypes.func.isRequired,
  renderToolbar: PropTypes.func,
  tooltip: PropTypes.shape({
    formatter: PropTypes.func
  }),
  seriesKey: PropTypes.string.isRequired
};

MapFactory.defaultProps = {
  legend: undefined,
  margin: 10,
  projection: d3.geoMercator(),
  renderToolbar: () => null,
  tooltip: undefined
};

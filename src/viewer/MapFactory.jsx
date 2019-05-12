import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import GeographyProvider from 'viewer/shared/GeographyProvider';
import Legend from 'viewer/shared/Legend';
import Toolbar from 'viewer/shared/Toolbar';
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
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  const annotations = false;
  const markers = false;

  return (
    <SvgContainer margin={margin} height={clientHeight} width={clientWidth}>
      <GeographyProvider
        height={drawHeight}
        width={drawWidth}
        projection={projection}
        {...geoAssets}
        render={geographyProps => (
          <ZoomableGroup height={drawHeight} width={drawWidth}>
            {children({ ...geographyProps })}
            {annotations && <Annotations annotations={annotations} />}
            {markers && <Markers markers={markers} />}
          </ZoomableGroup>
        )}
      />
      {legend && <Legend {...legend} />}
      <Toolbar />
    </SvgContainer>
  );
}

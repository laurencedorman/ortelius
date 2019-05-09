import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { geoMercator } from 'd3-geo';

import GeographyProvider from 'viewer/shared/GeographyProvider';
import Geography from 'viewer/shared/Geography';
import Legend from 'viewer/shared/Legend';
import Toolbar from 'viewer/shared/Toolbar';
import SvgContainer from 'viewer/shared/SvgContainer';
import ZoomableGroup from 'viewer/shared/ZoomableGroup';

import getDrawDims from 'utils/getDrawDims';

export default function SimpleMap({ margin = 10, geoAssets, series }) {
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  return (
    <SvgContainer margin={margin} height={drawHeight} width={drawWidth}>
      <GeographyProvider
        height={drawHeight}
        width={drawWidth}
        projection={geoMercator()}
        {...geoAssets}
        render={({ geographies, path, projection }) => (
          <ZoomableGroup height={drawHeight} width={drawWidth}>
            {geographies.map(geography => {
              return (
                <Geography
                  key={geography.id}
                  geography={geography}
                  path={path}
                  projection={projection}
                />
              );
            })}
          </ZoomableGroup>
        )}
      />
      <Legend />
      <Toolbar />
    </SvgContainer>
  );
}

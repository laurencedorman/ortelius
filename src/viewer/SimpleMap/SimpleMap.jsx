import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { geoMercator } from 'd3-geo';

import GeoFeaturesProvider from 'viewer/shared/GeoFeaturesProvider';
import LayersProvider from 'viewer/shared/LayersProvider';
import Layer from 'viewer/shared/Layer';
import Legend from 'viewer/shared/Legend';
import Toolbar from 'viewer/shared/Toolbar';
import SvgContainer from 'viewer/shared/SvgContainer';
import ZoomableGroup from 'viewer/shared/ZoomableGroup';

export function getDrawDims(height, width, margin = 10) {
  return {
    drawHeight: height - margin * 2,
    drawWidth: width - margin * 2
  };
}

export default function SimpleMap({ margin, geoAssetsUrl, layers: layersConfig }) {
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  return (
    <GeoFeaturesProvider
      height={drawHeight}
      width={drawWidth}
      projection={geoMercator()}
      url={geoAssetsUrl}
      render={({ geoFeatures }) => {
        return (
          <LayersProvider
            geoFeatures={geoFeatures}
            config={layersConfig}
            render={({ layers }) => {
              console.log('hii');
              return <div>hi</div>;
            }}
          />
        );
      }}
    />
  );
}

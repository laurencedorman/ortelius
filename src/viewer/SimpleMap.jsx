import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { geoMercator } from 'd3-geo';

import GeoFeaturesProvider from 'viewer/shared/GeoFeaturesProvider';
import LayersProvider from 'viewer/layers/LayersProvider';
import Layer from 'viewer/layers/Layer';
import Legend from 'viewer/shared/Legend';
import Toolbar from 'viewer/shared/Toolbar';
import SvgContainer from 'viewer/shared/SvgContainer';
import ZoomableGroup from 'viewer/shared/ZoomableGroup';

import getDrawDims from 'utils/getDrawDims';

export default function SimpleMap({
  margin = 10,
  geoAssetsUrl,
  geoAssetFilter,
  layers: layerConfig
}) {
  const { clientHeight, clientWidth } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  return (
    <GeoFeaturesProvider
      height={drawHeight}
      width={drawWidth}
      projection={geoMercator()}
      url={geoAssetsUrl}
      filter={geoAssetFilter}
      render={({ geoFeatures }) => (
        <LayersProvider
          layerConfig={layerConfig}
          render={({ layers }) => (
            <Fragment>
              <SvgContainer margin={margin} height={drawHeight} width={drawWidth}>
                <ZoomableGroup height={drawHeight} width={drawWidth}>
                  {layers.map((layer, index) => (
                    <Layer key={layer.id} index={index} geoFeatures={geoFeatures} {...layer} />
                  ))}
                </ZoomableGroup>
              </SvgContainer>
              <Legend />
              <Toolbar />
            </Fragment>
          )}
        />
      )}
    />
  );
}

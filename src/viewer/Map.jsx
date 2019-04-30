import React from 'react';
import PropTypes from 'prop-types';
import { geoMercator } from 'd3-geo';

import createGeoFeatures from 'utils/createGeoFeatures';
import prepareGeoJson from 'utils/prepareGeoJson';

import SvgContainer from './SvgContainer';
import ZoomableGroup from './ZoomableGroup';
import ChoroplethLayer from './ChoroplethLayer';

const mapLayers = {
  choropleth: ChoroplethLayer
};

export function getDrawDims(height, width, margin) {
  return {
    drawHeight: height - margin * 2,
    drawWidth: width - margin * 2
  };
}

export default function Map({
  margin,
  layers,
  zoom,
  panning,
  geoAssetsType,
  geoAssets,
  projection,
  height: containerHeight,
  width: containerWidth
}) {
  const geojson = prepareGeoJson(geoAssetsType, geoAssets);
  const { drawHeight, drawWidth } = getDrawDims(containerHeight, containerWidth, margin);

  const geoPathParams = {
    height: drawHeight,
    width: drawWidth,
    geojson,
    projection
  };

  const geoFeatures = createGeoFeatures(geojson.features, geoPathParams);

  return (
    <SvgContainer margin={margin} height={containerHeight} width={containerWidth}>
      <ZoomableGroup height={containerHeight} width={containerWidth} zoom={zoom} panning={panning}>
        {layers.map(({ type, ...rest }) => {
          const Component = mapLayers[type];

          return React.createElement(Component, {
            key: Date.now(),
            geoFeatures,
            ...rest
          });
        })}
      </ZoomableGroup>
    </SvgContainer>
  );
}

Map.propTypes = {
  geoAssets: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.object]).isRequired,
  geoAssetsType: PropTypes.string,
  height: PropTypes.number.isRequired,
  layers: PropTypes.arrayOf(Object).isRequired,
  margin: PropTypes.number,
  panning: PropTypes.bool,
  projection: PropTypes.func,
  width: PropTypes.number.isRequired,
  zoom: PropTypes.bool
};

Map.defaultProps = {
  geoAssetsType: 'json',
  margin: 10,
  panning: true,
  projection: geoMercator(),
  zoom: true
};

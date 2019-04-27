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
  geoDataType,
  geoData,
  projection = geoMercator(),
  height: containerHeight,
  width: containerWidth
}) {
  const geojson = prepareGeoJson(geoDataType, geoData);

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
      <ZoomableGroup>
        {layers.map(({ type, ...rest }) => {
          const Component = mapLayers[type];

          return React.createElement(Component, {
            key: `${type}-${Date.now()}`,
            geoFeatures,
            ...rest
          });
        })}
      </ZoomableGroup>
    </SvgContainer>
  );
}

Map.propTypes = {
  margin: PropTypes.number,
  layers: PropTypes.arrayOf(Object).isRequired,
  panning: PropTypes.bool,
  zoom: PropTypes.bool
};

Map.defaultProps = {
  margin: 10,
  panning: true,
  zoom: true
};

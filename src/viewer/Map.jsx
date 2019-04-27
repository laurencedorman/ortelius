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
  projection,
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
      <ZoomableGroup zoom={zoom} panning={panning}>
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
  geoData: PropTypes.arrayOf(Object).isRequired,
  geoDataType: PropTypes.string,
  height: PropTypes.number.isRequired,
  layers: PropTypes.arrayOf(Object).isRequired,
  margin: PropTypes.number,
  panning: PropTypes.bool,
  projection: PropTypes.func,
  width: PropTypes.number.isRequired,
  zoom: PropTypes.bool
};

Map.defaultProps = {
  geoDataType: 'json',
  margin: 10,
  panning: true,
  projection: geoMercator(),
  zoom: true
};

import React from 'react';
import { feature as topo2geo } from 'topojson';
import { geoPath as d3GeoPath, geoMercator } from 'd3-geo';

import SvgContainer from './SvgContainer';
import ZoomableGroup from './ZoomableGroup';

import ChoroplethLayer from './ChoroplethLayer';

const mapLayers = {
  choropleth: ChoroplethLayer
};

export function createGeoPath({ projection, width, height, geojson }) {
  return d3GeoPath().projection(projection.fitExtent([[0, 0], [width, height]], geojson));
}

export function getDrawDims(height, width, margin) {
  return {
    drawHeight: height - margin * 2,
    drawWidth: width - margin * 2
  };
}

const Map = ({
  margin = 10,
  layers,
  zoom,
  panning,
  topoJson,
  projection = geoMercator(),
  height: containerHeight,
  width: containerWidth
}) => {
  const topoJsonKey = Object.keys(topoJson.objects)[0];
  const geojson = topo2geo(topoJson, topoJson.objects[topoJsonKey]);

  const { drawHeight, drawWidth } = getDrawDims(containerHeight, containerWidth, margin);

  const geoPath = createGeoPath({
    height: drawHeight,
    width: drawWidth,
    geojson,
    projection
  });

  const features = geojson.features.map(feature => {
    const { properties, id } = feature;

    return {
      id,
      ...properties,
      path: geoPath(feature),
      bounds: geoPath.bounds(feature)
    };
  });

  return (
    <SvgContainer margin={margin} height={containerHeight} width={containerWidth}>
      <ZoomableGroup>
        {layers.map(({ type, ...rest }, index) => {
          const Component = mapLayers[type];

          return React.createElement(Component, {
            key: `${type}-${index}`,
            features,
            ...rest
          });
        })}
      </ZoomableGroup>
    </SvgContainer>
  );
};

export default Map;

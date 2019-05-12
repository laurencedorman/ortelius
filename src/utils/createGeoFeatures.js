import { geoPath as d3GeoPath } from 'd3-geo';

export function createGeoPath({ projection, width, height, geojson }) {
  return d3GeoPath().projection(projection.fitSize([width, height], geojson));
}

export default function createGeoFeatures(features, geoPathParams) {
  // const geoPath = createGeoPath(geoPathParams);

  return features.map(feature => {
    const { properties, id } = feature;

    return {
      id,
      geoProperties: properties
      // path: geoPath(feature),
      // bounds: geoPath.bounds(feature)
    };
  });
}

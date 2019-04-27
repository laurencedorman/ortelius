import { feature as topo2geo } from 'topojson';

export default function prepareGeoJson(ext, fetchedData) {
  let geoJson = fetchedData;

  if (ext === 'json') {
    const topoJsonKey = Object.keys(fetchedData.objects)[0];

    geoJson = topo2geo(fetchedData, fetchedData.objects[topoJsonKey]);
  }

  geoJson.features = geoJson.features.filter(feature => {
    return (
      feature.properties.NUTS_ID.indexOf('FRA') === -1 &&
      feature.properties.NUTS_ID.indexOf('CY') === -1 &&
      !['IS00', 'ES70', 'PT20', 'PT30'].includes(feature.properties.NUTS_ID) &&
      feature.properties.NUTS_ID.indexOf('TR') === -1
    );
  });

  return geoJson;
}

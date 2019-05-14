import { feature } from 'topojson-client';
import { presimplify, simplify } from 'topojson-simplify';

export default function prepareGeoJson(
  format = 'topojson',
  fetchedData,
  filter = geoJson => geoJson,
  simplifyFactor = 0
) {
  let geoJson = fetchedData;

  if (format === 'topojson') {
    const topoJsonKey = Object.keys(fetchedData.objects)[0];
    let topoJson = presimplify(fetchedData);
    topoJson = simplify(topoJson, simplifyFactor);

    geoJson = feature(topoJson, topoJson.objects[topoJsonKey]);
  }

  geoJson = filter(geoJson);

  return geoJson;
}

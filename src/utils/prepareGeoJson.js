import * as topojson from 'topojson';

export default function prepareGeoJson(
  format = 'topojson',
  fetchedData,
  filter = geoJson => geoJson,
  simplifyFactor = 0
) {
  let geoJson = fetchedData;

  if (format === 'topojson') {
    const topoJsonKey = Object.keys(fetchedData.objects)[0];
    let topoJson = topojson.presimplify(fetchedData);
    topoJson = topojson.simplify(topoJson, simplifyFactor);

    geoJson = topojson.feature(topoJson, topoJson.objects[topoJsonKey]);
  }

  geoJson = filter(geoJson);

  return geoJson;
}

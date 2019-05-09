import * as topojson from 'topojson';

export default function prepareGeoJson(ext, fetchedData, filter) {
  let geoJson = fetchedData;

  if (ext === 'json') {
    const topoJsonKey = Object.keys(fetchedData.objects)[0];

    geoJson = topojson.feature(fetchedData, fetchedData.objects[topoJsonKey]);
  }

  geoJson = filter(geoJson);

  return geoJson;
}

import castToFloat from './castToFloat';

const dataByIdCache = {};

export default function getDataById(data, valueKey, seriesKey) {
  if (dataByIdCache[valueKey]) {
    return dataByIdCache[valueKey];
  }

  const dataById = data.reduce((dict, datum) => {
    return {
      ...dict,
      [datum[seriesKey]]: {
        ...datum,
        value: castToFloat(datum[valueKey], datum[seriesKey])
      }
    };
  }, {});

  dataByIdCache[valueKey] = dataById;

  return dataByIdCache[valueKey];
}

import { csvParse } from 'd3-dsv';

function castToFloat(valueToCast, idKey) {
  try {
    const value = parseFloat(valueToCast);

    if (Number.isNaN(value)) {
      throw TypeError(
        `Expected a numeric value on datum with id: "${idKey}" but got ${JSON.stringify(
          valueToCast
        )}`
      );
    }

    return value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);

    return 0;
  }
}

export default function prepareData(dataType, columnNames, rawData) {
  const { id: idKey = 'id', value: valueKey = 'value' } = columnNames;
  let data = rawData;

  if (dataType === 'csv') {
    data = csvParse(rawData);
  }

  return data.map(datum => {
    return {
      ...datum,
      id: datum[idKey],
      value: castToFloat(datum[valueKey], datum[idKey])
    };
  });
}

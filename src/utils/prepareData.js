import { csvParse } from 'd3-dsv';

export default function prepareData(dataType, columnNames, rawData) {
  const { id, value } = columnNames;
  let data = rawData;

  if (dataType === 'csv') {
    data = csvParse(rawData);
  }

  return data.map(datum => ({
    ...datum,
    id: datum[id],
    value: datum[value]
  }));
}

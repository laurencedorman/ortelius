import { dsvFormat } from 'd3-dsv';

const prepareWithSeparator = (promise, separator) => {
  return promise
    .then(response => response.text())
    .then(data => ({
      data,
      separator
    }));
};

export default async urls => {
  const rawCSV = await Promise.all(
    urls.map(url => {
      if (typeof url === 'string') {
        return prepareWithSeparator(fetch(url), ',');
      }
      if (url && url.url && url.separator) {
        return prepareWithSeparator(fetch(url.url), url.separator);
      }

      throw TypeError('Expected either an object or a string in fetchCSV');
    })
  );

  return rawCSV.map(({ data, separator }) => dsvFormat(separator).parse(data));
};

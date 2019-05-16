import React from 'react';
import ReactDOM from 'react-dom';

import { dsvFormat } from 'd3-dsv';

import { Choropleth } from 'modules';

export default {
  createMap: ({ container, type, ...rest }) => {
    const containerElem = document.querySelector(container);
    let Factory;

    if (type === 'choropleth') {
      Factory = Choropleth;
    }

    ReactDOM.render(
      React.createElement(Factory, {
        ...rest
      }),
      containerElem
    );
  },
  fetchCSV: async (urls, separator = ',') => {
    const rawCSV = await Promise.all(urls.map(url => fetch(url).then(response => response.text())));

    return rawCSV.map(dsvFormat(separator).parse);
  },
  fetchJSON: async items =>
    Promise.all(items.map(({ url }) => fetch(url).then(response => response.json())))
};

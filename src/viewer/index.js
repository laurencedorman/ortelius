import React from 'react';
import ReactDOM from 'react-dom';

import { csvParse } from 'd3-dsv';

import SimpleMap from './SimpleMap';
// import DynamicMap from './DynamicMap';

const mapFactory = Factory => ({ container, ...rest }) => {
  const containerElem = document.querySelector(container);

  ReactDOM.render(
    React.createElement(Factory, {
      ...rest
    }),
    containerElem
  );
};

export default {
  createSimpleMap: mapFactory(SimpleMap),
  fetchCSV: async urls => {
    const rawCSV = await Promise.all(urls.map(url => fetch(url).then(response => response.text())));

    return rawCSV.map(csvParse);
  },
  fetchJSON: async items =>
    Promise.all(items.map(({ url }) => fetch(url).then(response => response.json())))
};

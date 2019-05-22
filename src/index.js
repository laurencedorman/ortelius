import React from 'react';
import ReactDOM from 'react-dom';

import { Choropleth } from 'modules';
import { fetchCSV, fetchJSON } from 'utils';

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
  fetchCSV,
  fetchJSON
};

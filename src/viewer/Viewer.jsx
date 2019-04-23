import React from 'react';
import ReactDOM from 'react-dom';

import Map from './Map';

const create = ({ container, map: { src } }) => {
  const containerElem = document.querySelector(container);

  const { clientWidth, clientHeight } = document.documentElement;

  fetch(src)
    .then(res => res.json())
    .then(geojson => {
      ReactDOM.render(
        <Map geojson={geojson} height={clientHeight} width={clientWidth} />,
        containerElem
      );
    });
};

const Viewer = () => {};

export default {
  create
};

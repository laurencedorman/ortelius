import React from 'react';
import ReactDOM from 'react-dom';

import Map from 'shared/Map';

const create = ({ map: { src } }) => {
  const rawWidth = document.documentElement.clientWidth;
  const rawHeight = document.documentElement.clientHeight;

  fetch(src)
    .then(res => res.json())
    .then(geojson => {
      ReactDOM.render(
        <Map geojson={geojson} height={rawHeight} width={rawWidth} />,
        document.getElementById('root')
      );
    });
};

export default {
  create
};

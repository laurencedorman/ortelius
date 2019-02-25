import React, { useState } from 'react';
import { render } from 'react-dom';

import Map from './components/Map';

// https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate

/*
scalechange = newscale - oldscale;
offsetX = -(zoomPointX * scalechange);
offsetY = -(zoomPointY * scalechange);
*/

const rawWidth = document.documentElement.clientWidth;
const rawHeight = document.documentElement.clientHeight;

fetch('./france-departements-simplified.geojson')
  .then(res => res.json())
  .then((geojson) => {
    render(
      <Map
        geojson={geojson}
        height={rawHeight}
        width={rawWidth}
      />,
      document.getElementById('root'),
    );
  });

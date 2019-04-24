import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { csvParse } from 'd3-dsv';

import useFetch from 'hooks/useFetch';
import Map from './Map';

function Viewer(props) {
  const {
    map: { src },
    ...rest
  } = props;
  // @TODO fetch these only if param says so
  const { clientWidth, clientHeight } = document.documentElement;
  const [data, loading] = useFetch(src);

  if (!loading) {
    return (
      <div>
        <Map topoJson={data} height={clientHeight} width={clientWidth} {...rest} />
      </div>
    );
  }
  return null;
}

export default {
  create({ container, ...rest }) {
    const containerElem = document.querySelector(container);

    ReactDOM.render(<Viewer {...rest} />, containerElem);
  },
  csvParse
};

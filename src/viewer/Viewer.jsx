import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import useFetch from 'hooks/useFetch';
import Map from './Map';

export function Viewer(props) {
  const { geoAssets, ...rest } = props;
  // @TODO fetch these only if param says so
  const { clientWidth, clientHeight } = document.documentElement;
  const [data, loading] = useFetch(geoAssets);

  if (!loading) {
    return (
      <div>
        <Map topoJson={data} height={clientHeight} width={clientWidth} {...rest} />
      </div>
    );
  }
  return null;
}

Viewer.propTypes = {
  geoAssets: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

export default {
  create({ container, ...rest }) {
    const containerElem = document.querySelector(container);

    ReactDOM.render(<Viewer {...rest} />, containerElem);
  }
};

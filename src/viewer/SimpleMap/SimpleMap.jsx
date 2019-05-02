import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Layer from 'viewer/shared/Layer';
import Legend from 'viewer/shared/Legend';
import Map from 'viewer/shared/Map';
import Toolbar from 'viewer/shared/Toolbar';
import SvgContainer from 'viewer/shared/SvgContainer';
import ZoomableGroup from 'viewer/shared/ZoomableGroup';

export default function SimpleMap({ margin }) {
  return (
    <Map
      render={({ layers, height, width }) => (
        <Fragment>
          <SvgContainer margin={margin} height={height} width={width}>
            <ZoomableGroup height={height} width={width}>
              {layers.map(layer => (
                <Layer key={layer.id} id={layer.id} {...layer} />
              ))}
            </ZoomableGroup>
          </SvgContainer>
          <Legend />
          <Toolbar />
        </Fragment>
      )}
    />
  );
}

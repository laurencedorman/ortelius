import React from 'react';
import PropTypes from 'prop-types';

export default function StoryMap({ margin, geoAssetsUrl }) {
  return (
    <GeoFeaturesProvider
      url={geoAssetsUrl}
      render={({ geoFeatures }) => (
        <LayersProvider
          geoFeatures={geoFeatures}
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
      )}
    />
  );
}

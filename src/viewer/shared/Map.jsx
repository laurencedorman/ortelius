import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { geoMercator } from 'd3-geo';

import createGeoFeatures from 'utils/createGeoFeatures';
import prepareGeoJson from 'utils/prepareGeoJson';

import useFetch from 'hooks/useFetch';
import fileExtension from 'utils/fileExtension';
import prepareData from 'utils/prepareData';

function hydrateLayers(layers, fetchedStatData) {
  return layers.map(layer => {
    const {
      columnNames,
      data: { type }
    } = layer;
    let data;

    if (fetchedStatData && fetchedStatData.length > 0) {
      data = fetchedStatData.pop();
    }

    return {
      id: `layer-${Date.now()}`,
      ...layer,
      data: prepareData(type, columnNames, data)
    };
  });
}

export function getDrawDims(height, width, margin) {
  return {
    drawHeight: height - margin * 2,
    drawWidth: width - margin * 2
  };
}

const MapContext = React.createContext({});

export default function Map({ render, margin, geoAssetsUrl, layers, ...restOfProps }) {
  const { clientWidth, clientHeight } = document.documentElement;
  const { drawHeight, drawWidth } = getDrawDims(clientHeight, clientWidth, margin);

  const statDataToFetch = layers.map(layer => layer.data && layer.data.url).filter(url => url);

  const [[geoAssets, ...fetchedStatData], isLoading] = useFetch([geoAssetsUrl, ...statDataToFetch]);

  const hydratedLayers = useMemo(() => {
    return hydrateLayers(layers, fetchedStatData);
  }, [layers, fetchedStatData]);

  const geoFeatures = useMemo(() => {
    const geoAssetsType = fileExtension(geoAssetsUrl);
    const geojson = prepareGeoJson(geoAssetsType, geoAssets);

    const geoPathParams = {
      height: drawHeight,
      width: drawWidth,
      geojson,
      projection
    };

    return createGeoFeatures(geojson.features, geoPathParams);
  }, [geoAssets, geoAssetsUrl]);

  if (!isLoading) {
    return (
      <MapContext.Provider value={{ geoFeatures }}>
        {render({
          isLoading,
          height: drawHeight,
          width: drawWidth,
          layers: hydratedLayers,
          config: restOfProps
        })}
      </MapContext.Provider>
    );
  }
}

Map.propTypes = {
  geoAssets: PropTypes.oneOfType([PropTypes.arrayOf(Object), PropTypes.object]).isRequired,
  geoAssetsType: PropTypes.string,
  height: PropTypes.number.isRequired,
  layers: PropTypes.arrayOf(Object).isRequired,
  margin: PropTypes.number,
  panning: PropTypes.bool,
  projection: PropTypes.func,
  width: PropTypes.number.isRequired,
  zoom: PropTypes.bool
};

Map.defaultProps = {
  geoAssetsType: 'json',
  margin: 10,
  panning: true,
  projection: geoMercator(),
  zoom: true
};

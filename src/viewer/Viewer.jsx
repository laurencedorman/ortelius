import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import useFetch from 'hooks/useFetch';
import fileExtension from 'utils/fileExtension';
import prepareData from 'utils/prepareData';

import Map from './Map';

import styles from './Viewer.module.scss';

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
export default function Viewer(props) {
  const { geoAssetsUrl, layers, ...rest } = props;

  const { clientWidth, clientHeight } = document.documentElement;

  const statDataToFetch = layers.map(layer => layer.data && layer.data.url).filter(url => url);

  const [[geoAssets, ...fetchedStatData], isLoading] = useFetch([geoAssetsUrl, ...statDataToFetch]);

  const hydratedLayers = useMemo(() => {
    return hydrateLayers(layers, fetchedStatData);
  }, [layers, fetchedStatData]);


  if (!isLoading) {
    return (
      <div className={styles.Viewer}>
        <Map
          geoAssets={geoAssets}
          geoAssetsType={fileExtension(geoAssetsUrl)}
          height={clientHeight}
          width={clientWidth}
          layers={hydratedLayers}
          {...rest}
        />
      </div>
    );
  }

  return null;
}

Viewer.propTypes = {
  geoAssetsUrl: PropTypes.string.isRequired,
  layers: PropTypes.arrayOf(Object).isRequired
};

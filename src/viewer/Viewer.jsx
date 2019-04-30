import React from 'react';
import PropTypes from 'prop-types';

import useFetch from 'hooks/useFetch';
import fileExtension from 'utils/fileExtension';
import prepareData from 'utils/prepareData';

import Map from './Map';

import styles from './Viewer.module.scss';

export default function Viewer(props) {
  const { geoAssetsUrl, layers, ...rest } = props;

  const { clientWidth, clientHeight } = document.documentElement;

  const statDataToFetch = layers.map(layer => layer.data && layer.data.url).filter(url => url);

  const [[geoAssets, ...fetchedStatData], isLoading] = useFetch([geoAssetsUrl, ...statDataToFetch]);

  if (!isLoading) {
    const enrichedLayers = layers.map(layer => {
      const {
        columnNames,
        data: { type }
      } = layer;
      let {
        data: { raw }
      } = layer;

      if (!raw && fetchedStatData && fetchedStatData.length > 0) {
        raw = fetchedStatData.pop();
      }

      return {
        ...layer,
        data: prepareData(type, columnNames, raw)
      };
    });

    return (
      <div className={styles.Viewer}>
        <Map
          geoAssets={geoAssets}
          geoAssetsType={fileExtension(geoAssetsUrl)}
          height={clientHeight}
          width={clientWidth}
          layers={enrichedLayers}
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

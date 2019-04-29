import React from 'react';
import PropTypes from 'prop-types';

import useFetch from 'hooks/useFetch';
import fileExtension from 'utils/fileExtension';

import Map from './Map';

import styles from './Viewer.module.scss';

export default function Viewer(props) {
  const { geoAssetsUrl, ...rest } = props;

  const { clientWidth, clientHeight } = document.documentElement;
  const [fetchedData, isLoading] = useFetch(geoAssetsUrl);

  if (!isLoading) {
    return (
      <div className={styles.Viewer}>
        <Map
          geoData={fetchedData}
          geoDataType={fileExtension(geoAssetsUrl)}
          height={clientHeight}
          width={clientWidth}
          {...rest}
        />
      </div>
    );
  }

  return null;
}

Viewer.propTypes = {
  geoAssetsUrl: PropTypes.string.isRequired
};

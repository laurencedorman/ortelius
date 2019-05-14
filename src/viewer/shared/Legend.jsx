import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'utils/d3-custom';

import styles from './Legend.module';

export default function Legend({ labels, scale }) {
  const legendItems = scale.range();

  return (
    <div className={styles.Legend}>
      {legendItems.map((item, index) => {
        return (
          <div key={`${item}-${index}`} className={styles.LegendItem}>
            <i style={{ backgroundColor: item }} />
            <p>{labels[index]}</p>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

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

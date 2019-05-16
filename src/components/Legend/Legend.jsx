import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Legend.module';

// @todo toggle legend
// @todo make compatible with scaleLinear
// @todo allow positioning; top-left, bottom-right etc
export default function Legend({ title, labels, scale }) {
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

Legend.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  scale: PropTypes.func.isRequired
};

Legend.defaultProps = {
  title: ''
};

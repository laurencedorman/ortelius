import React from 'react';
import PropTypes from 'prop-types';

import styles from './Legend.module';

// @todo toggle legend
// @todo make compatible with scaleLinear
// @todo allow positioning; top-left, bottom-right etc
export function Legend({ title, labels, scale }) {
  const legendItems = scale.range();

  return (
    <div className={styles.Legend}>
      {title && (
        <header>
          <h3>{title}</h3>
        </header>
      )}
      {legendItems.map((item, index) => {
        return (
          <div key={item} className={styles.LegendItem}>
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

export default React.memo(Legend);

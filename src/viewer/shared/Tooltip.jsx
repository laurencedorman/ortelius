import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tooltip.module';

export default function Tooltip({ title, valueLabel, value }) {
  return (
    <div className={styles.Tooltip}>
      <p>{title}</p>
      <p>
        {valueLabel} : {value}
      </p>
    </div>
  );
}

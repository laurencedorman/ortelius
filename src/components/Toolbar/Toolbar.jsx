import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module';

export default function Toolbar({ from, to, interval, onChange }) {
  const onClick = newValueKey => {
    onChange(newValueKey);
  };

  return (
    <div className={styles.Toolbar}>
      <button onClick={onClick.bind(null, from)} type="button">
        {from}
      </button>
      <button onClick={onClick.bind(null, to)} type="button">
        {to}
      </button>
    </div>
  );
}

Toolbar.propTypes = {};

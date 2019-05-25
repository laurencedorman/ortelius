import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.scss';

export default function Toolbar({ width, margin, children }) {
  const start = margin;
  const finish = width - margin;

  return (
    <div
      className={styles.Toolbar}
      style={{
        left: `${start}px`,
        width: `${finish}px`
      }}
    >
      {children}
    </div>
  );
}

Toolbar.propTypes = {
  width: PropTypes.number.isRequired,
  margin: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

Toolbar.defaultProps = {
  margin: 20
};

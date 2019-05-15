import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Tooltip.module';

export default function Tooltip({ items }) {
  return (
    <div className={styles.Tooltip}>
      {items.map(({ isTitle, label, value }, index) => {
        const key = value + index;

        return (
          <p key={key} className={classNames({ [styles.TooltipTitle]: isTitle })}>
            <span className={styles.TooltipKey}>{`${label} :`}</span>
            <span className={styles.TooltipValue}>{value}</span>
          </p>
        );
      })}
    </div>
  );
}

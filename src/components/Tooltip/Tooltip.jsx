import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { OrteliusContext } from 'modules';

import styles from './Tooltip.module';

// @todo no data option
export default function Tooltip({ formatter }) {
  const { highlightedGeography } = useContext(OrteliusContext);

  if (!highlightedGeography) {
    return null;
  }

  const items = formatter(highlightedGeography);

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

Tooltip.propTypes = {
  formatter: PropTypes.func.isRequired
};

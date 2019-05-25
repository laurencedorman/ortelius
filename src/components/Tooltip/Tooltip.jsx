import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { OrteliusContext } from 'modules';

import styles from './Tooltip.module.scss';

// @todo no data option
const Tooltip = ({ formatter }) => {
  const { highlightedGeography } = useContext(OrteliusContext);

  if (!highlightedGeography) {
    return null;
  }

  // @todo - need to create a try/catch around this
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
};

Tooltip.propTypes = {
  formatter: PropTypes.func.isRequired
};

export default React.memo(Tooltip);

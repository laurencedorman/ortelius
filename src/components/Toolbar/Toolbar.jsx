import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';

import { d3 } from 'utils';

import styles from './Toolbar.module';

export default function Toolbar({
  from: fromString,
  to: toString,
  format,
  interval,
  activeValueKey,
  width,
  margin = 20,
  onChange
}) {
  const onClick = newValueKey => {
    onChange(newValueKey);
  };

  const start = margin;
  const finish = width - margin;

  const from = dayjs(fromString);
  const to = dayjs(toString);

  const ticks = [];
  let current = from;

  while (current.isBefore(to) || current.isSame(to)) {
    ticks.push(current);

    current = current.add(1, interval);
  }

  return (
    <div
      className={styles.Toolbar}
      style={{
        left: `${start}px`,
        width: `${finish}px`
      }}
    >
      {ticks.map(tick => {
        const label = tick.format(format);

        return (
          <button
            className={cn(styles.ToolbarItem, {
              [styles.active]: label === activeValueKey
            })}
            key={tick.unix()}
            onClick={onClick.bind(null, label)}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

Toolbar.propTypes = {};

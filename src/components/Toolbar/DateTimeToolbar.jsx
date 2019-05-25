import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dayjs from 'dayjs';

import { OrteliusContext } from 'modules';

import Toolbar from './Toolbar';

import styles from './DateTimeToolbar.module.scss';

export function DateTimeToolbar({
  interval,
  from: fromString,
  to: toString,
  format,
  ...toolbarProps
}) {
  const { setValueKey, valueKey } = useContext(OrteliusContext);
  const from = dayjs(fromString);
  const to = dayjs(toString);

  const ticks = [];
  let current = from;

  while (current.isBefore(to) || current.isSame(to)) {
    ticks.push(current);

    current = current.add(1, interval);
  }

  return (
    <Toolbar {...toolbarProps}>
      {ticks.map(tick => {
        const label = tick.format(format);

        return (
          <button
            className={cn(styles.DateTimeToolbarItem, {
              [styles.active]: label === valueKey
            })}
            key={tick.unix()}
            onClick={() => setValueKey(label)}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </Toolbar>
  );
}

DateTimeToolbar.propTypes = {
  interval: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  format: PropTypes.string
};

DateTimeToolbar.defaultProps = {
  format: 'YYYY MM-DDTHH:mm:ss SSS [Z] A'
};

export default React.memo(DateTimeToolbar);

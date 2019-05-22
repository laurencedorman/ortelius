import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { OrteliusContext } from 'modules';

import Toolbar from './Toolbar';

import styles from './ComparisonToolbar.module';

export function ComparisonToolbar({ options, ...toolbarProps }) {
  const { setValueKey, valueKey } = useContext(OrteliusContext);

  return (
    <Toolbar {...toolbarProps}>
      {options.map(({ label, value }) => {
        return (
          <button
            className={cn(styles.ComparisonToolbarItem, {
              [styles.active]: value === valueKey
            })}
            key={value}
            onClick={() => {
              setValueKey(value);
            }}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </Toolbar>
  );
}

ComparisonToolbar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default React.memo(ComparisonToolbar);

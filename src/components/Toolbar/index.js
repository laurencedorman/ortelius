import React from 'react';

import ComparisonToolbar from './ComparisonToolbar';
import DateTimeToolbar from './DateTimeToolbar';

export default function ToolbarFactory({ type, ...props }) {
  if (type === 'compare') {
    return React.createElement(ComparisonToolbar, props);
  }

  if (type === 'datetime') {
    return React.createElement(DateTimeToolbar, props);
  }
}

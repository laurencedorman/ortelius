import React from 'react';
import ReactDOM from 'react-dom';

import Viewer from './Viewer';

export default {
  create({ container, ...rest }) {
    const containerElem = document.querySelector(container);

    ReactDOM.render(
      React.createElement(Viewer, {
        ...rest
      }),
      containerElem
    );
  }
};

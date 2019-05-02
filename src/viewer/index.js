import React from 'react';
import ReactDOM from 'react-dom';

import SimpleMap from './SimpleMap';

const mapFactory = Factory => ({ container, ...rest }) => {
  const containerElem = document.querySelector(container);

  ReactDOM.render(
    React.createElement(Factory, {
      ...rest
    }),
    containerElem
  );
};

export default {
  createSimpleMap: mapFactory(SimpleMap)
  // createStoryMap: mapFactory(StoryMap)
};

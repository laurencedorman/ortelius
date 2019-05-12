import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'utils/d3-custom.js';

export default class Legend extends React.PureComponent {
  constructor(props) {
    super(props);

    this.legendContainer = React.createRef();
  }

  componentDidMount() {
    const { labels, labelWrap, scale } = this.props;

    const legend = d3
      .legendColor()
      .labelFormat(d3.format('.2f'))
      .labels(labels)
      .labelWrap(labelWrap)
      .scale(scale);

    d3.select(this.legendContainer.current).call(legend);
  }

  render() {
    return <g className="legend" ref={this.legendContainer} />;
  }
}

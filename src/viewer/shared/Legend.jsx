import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'utils/d3-custom.js';

export default class Legend extends React.PureComponent {
  constructor(props) {
    super(props);

    this.legendContainer = React.createRef();
  }

  componentDidMount() {
    const legend = d3
      .legendColor()
      .labelFormat(d3.format('.2f'))
      // .labels(d3.legendHelpers.thresholdLabels)
      .scale(this.props.scale);

    d3.select(this.legendContainer.current).call(legend);
  }

  render() {
    return <g className="legend" ref={this.legendContainer} />;
  }
}

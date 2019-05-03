import React from 'react';
import PropTypes from 'prop-types';

import prepareData from 'utils/prepareData';

export default class LayerProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      layers: []
    };
  }

  async componentDidMount() {
    const { layerConfig } = this.props;
    const urls = layerConfig
      .map(configItem => configItem.data && configItem.data.url)
      .filter(url => url);

    const rawCSVArray = await Promise.all(
      urls.map(async url => fetch(url).then(response => response.text()))
    );

    const layers = this.hydrateLayerConfig(rawCSVArray);

    this.setState({
      isLoading: false,
      layers
    });
  }

  hydrateLayerConfig(rawCSVArray) {
    const { layerConfig } = this.props;

    return layerConfig.map(configItem => {
      const {
        columnNames,
        data: { type },
        rawCSV = rawCSVArray.pop()
      } = configItem;

      return {
        id: 'layer-' + Date.now(),
        ...configItem,
        data: prepareData(type, columnNames, rawCSV)
      };
    });
  }

  render() {
    const { render } = this.props;
    const { isLoading, layers } = this.state;

    if (isLoading) {
      return <div>Loading Layers</div>;
    }

    return render({ layers });
  }
}

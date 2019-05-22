import React from 'react';
import PropTypes from 'prop-types';

import { d3, prepareGeoJson } from 'utils';

export default class GeographyProvider extends React.PureComponent {
  static propTypes = {
    filter: PropTypes.func,
    format: PropTypes.string,
    height: PropTypes.number.isRequired,
    projection: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    simplifyFactor: PropTypes.number,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    filter: geoJson => geoJson,
    format: 'topojson',
    simplifyFactor: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      geojson: null
    };
  }

  async componentDidMount() {
    const { url, filter, format, simplifyFactor } = this.props;

    const geojson = await fetch(url)
      .then(response => response.json())
      .then(geoAssets => {
        return prepareGeoJson(format, geoAssets, filter, simplifyFactor);
      });

    this.setState({
      isLoading: false,
      geojson
    });
  }

  render() {
    const { isLoading, geojson } = this.state;
    const { render, width, height, projection } = this.props;

    if (isLoading) {
      //  @todo centralise and i18nise string
      return <div>Loading Geographies</div>;
    }

    const geoProjection = projection.fitSize([width, height], geojson);

    return render({
      geographies: geojson.features,
      projection: geoProjection,
      path: d3.geoPath(geoProjection)
    });
  }
}

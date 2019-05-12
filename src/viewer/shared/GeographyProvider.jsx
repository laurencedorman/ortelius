import React from 'react';
import PropTypes from 'prop-types';
import { geoPath } from 'd3-geo';

import prepareGeoJson from 'utils/prepareGeoJson';

export default class GeographyProvider extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    filter: PropTypes.func,
    format: PropTypes.string,
    simplifyFactor: PropTypes.number
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
      geographies: [],
      path: null,
      projection: null
    };
  }

  async componentDidMount() {
    const { url, height, width, projection, filter, format, simplifyFactor } = this.props;

    const geojson = await fetch(url)
      .then(response => response.json())
      .then(geoAssets => {
        return prepareGeoJson(format, geoAssets, filter, simplifyFactor);
      });

    const geoProjection = projection.fitSize([width, height], geojson);

    this.setState({
      isLoading: false,
      geographies: geojson.features,
      projection: geoProjection,
      path: geoPath(geoProjection)
    });
  }

  render() {
    const { isLoading, geographies, projection, path } = this.state;
    const { render } = this.props;

    if (isLoading) {
      return <div>Loading Geographies</div>;
    }

    return render({ geographies, projection, path });
  }
}

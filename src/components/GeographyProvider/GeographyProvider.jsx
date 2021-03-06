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
      path: d3.geoPath(geoProjection)
    });
  }

  render() {
    const { isLoading, geographies, projection, path } = this.state;
    const { render } = this.props;

    if (isLoading) {
      //  @todo centralise and i18nise string
      return <div>Loading Geographies</div>;
    }

    return render({ geographies, projection, path });
  }
}

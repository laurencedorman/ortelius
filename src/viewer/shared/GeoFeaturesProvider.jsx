import React from 'react';
import PropTypes from 'prop-types';

import createGeoFeatures from 'utils/createGeoFeatures';
import prepareGeoJson from 'utils/prepareGeoJson';

export default class GeoFeaturesProvider extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      geoFeatures: []
    };
  }

  async componentDidMount() {
    const { url, height, width, projection } = this.props;

    const geoFeatures = await fetch(url)
      .then(response => response.json())
      .then(geoAssets => {
        const geoAssetsType = 'json';
        const geojson = prepareGeoJson(geoAssetsType, geoAssets);

        const geoPathParams = {
          height,
          width,
          geojson,
          projection
        };

        return createGeoFeatures(geojson.features, geoPathParams);
      });

    this.setState({
      isLoading: false,
      geoFeatures
    });
  }

  render() {
    const { isLoading, geoFeatures } = this.state;
    const { render } = this.props;

    if (isLoading) {
      return <div>Loading GeoFeatures</div>;
    }

    return render({ geoFeatures });
  }
}

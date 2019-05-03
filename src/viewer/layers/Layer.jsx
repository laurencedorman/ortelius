import React from 'react';
import PropTypes from 'prop-types';

import createColorScale from 'utils/createColorScale';

import Feature from 'viewer/shared/Feature';

import Choropleth from './Choropleth';

export default class Layer extends React.PureComponent {
  layerTypes = {
    CHOROPLETH: 'CHOROPLETH',
    BUBBLE: 'BUBBLE',
    LINE: 'LINE',
    HEXBIN: 'HEXBIN',
    AREA: 'AREA',
    POINT: 'POINT',
    ANNOTATION: 'ANNOTATION'
  };

  constructor(props) {
    super(props);

    this.private = {};

    const { geoFeatures, data } = props;

    this.joinedGeoFeatures = this.joinDataToFeatures(geoFeatures, data);
  }

  get dataById() {
    const { data } = this.props;

    if (this.private.dataById) {
      return this.private.dataById;
    }

    this.private.dataById = data.reduce((dict, datum) => {
      return {
        ...dict,
        [datum.id]: datum
      };
    }, {});

    return this.private.dataById;
  }

  joinDataToFeatures(geoFeatures, data) {
    return geoFeatures.map(({ id, ...rest }) => {
      return {
        data: this.dataById[id],
        id,
        ...rest
      };
    });
  }

  getInnerLayer(type) {
    switch (true) {
      case type === this.layerTypes.CHOROPLETH:
        return Choropleth;
      case type === this.layerTypes.BUBBLE:
        break;
      case type === this.layerTypes.LINE:
        break;
      case type === this.layerTypes.HEXBIN:
        break;
      case type === this.layerTypes.AREA:
        break;
      case type === this.layerTypes.POINT:
        break;
      case type === this.layerTypes.ANNOTATION:
        break;
      default:
        throw new TypeError(`Failed to find layer of type ${type}`);
    }
  }

  render() {
    const { type, data } = this.props;

    const InnerLayer = this.getInnerLayer(type.toUpperCase());

    return (
      <g className="map-layer">
        <InnerLayer data={data} joinedGeoFeatures={this.joinedGeoFeatures} />
      </g>
    );
  }
}

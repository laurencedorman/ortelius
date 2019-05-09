import React from 'react';
import PropTypes from 'prop-types';

import createColorScale from 'utils/createColorScale';

import Feature from 'viewer/shared/Feature';

import Choropleth from './Choropleth';

export default class Layer extends React.PureComponent {
  static types = {
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

  static getInnerLayer(type) {
    switch (true) {
      case type === Layer.types.CHOROPLETH:
        return Choropleth;
      case type === Layer.types.BUBBLE:
        break;
      case type === Layer.types.LINE:
        break;
      case type === Layer.types.HEXBIN:
        break;
      case type === Layer.types.AREA:
        break;
      case type === Layer.types.POINT:
        break;
      case type === Layer.types.ANNOTATION:
        break;
      default:
        throw new TypeError(`Failed to find layer of type ${type}`);
    }
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

  render() {
    const { type, data } = this.props;

    const InnerLayer = Layer.getInnerLayer(type.toUpperCase());

    return (
      <g className="map-layer">
        <InnerLayer data={data} joinedGeoFeatures={this.joinedGeoFeatures} />
      </g>
    );
  }
}

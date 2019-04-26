import React from 'react';
import PropTypes from 'prop-types';

import { csvParse } from 'd3-dsv';
import { scaleLinear } from 'd3-scale';

import Feature from './Feature';

export function prepareData(dataType, rawData) {
  return csvParse(rawData);
}

const valueColumn = 'Taux de chômage, différence entre 2016 et 2007 (en points de %)';

export default function ChoroplethLayer({ data: rawData, dataType, features }) {
  const data = prepareData('csv', rawData);
  const scaleData = data.map(datum => datum[valueColumn]);

  const min = Math.min(...scaleData);
  const max = Math.max(...scaleData);

  const scale = scaleLinear()
    .domain([min, max])
    .range(['red', 'blue']);

  const dataById = data.reduce((dict, datum) => {
    return {
      ...dict,
      [datum['ID']]: datum
    };
  }, {});

  return (
    <g className="choropleth-layer">
      {features.map(({ id, ...rest }) => {
        let fill;
        const featureData = dataById[id];

        if (featureData) {
          fill = scale(+featureData[valueColumn]);
        }

        return <Feature key={id} {...rest} data={featureData} fill={fill} />;
      })}
    </g>
  );
}

ChoroplethLayer.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  dataType: PropTypes.string,
  features: PropTypes.arrayOf(Object).isRequired
};

ChoroplethLayer.defaultProps = {
  dataType: 'csv'
};

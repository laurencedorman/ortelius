import { scaleLinear, scaleThreshold } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

export default function createColorScale(
  config = { type: 'linear', range: [interpolateViridis(0), interpolateViridis(1)] },
  dataById
) {
  const { type } = config;

  if (type === 'linear') {
    const scaleData = Object.values(dataById).map(datum => datum.value);

    const min = Math.min(...scaleData);
    const max = Math.max(...scaleData);

    return scaleLinear()
      .domain([min, max])
      .range([interpolateViridis(0), interpolateViridis(1)]);
  }

  if (type === 'threshold') {
    return scaleThreshold()
      .domain(config.domain)
      .range(config.range);
  }
}

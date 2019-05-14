import { scaleLinear, scaleThreshold } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

export default function createColorScale(config, dataById) {
  const {
    type = 'linear',
    domain,
    range = [interpolateViridis(0), interpolateViridis(1)]
  } = config;

  if (type === 'linear') {
    const scaleData = Object.values(dataById).map(datum => datum.value);

    const min = Math.min(...scaleData);
    const max = Math.max(...scaleData);

    return scaleLinear()
      .domain([min, max])
      .range(range);
  }

  if (type === 'threshold') {
    return scaleThreshold()
      .domain(domain)
      .range(range);
  }

  return null;
}

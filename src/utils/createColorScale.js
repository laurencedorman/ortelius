import { scaleLinear } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

export default function createColorScale(data) {
  const scaleData = data.map(datum => datum.value);

  const min = Math.min(...scaleData);
  const max = Math.max(...scaleData);

  const scale = scaleLinear()
    .domain([min, max])
    .range([interpolateViridis(0), interpolateViridis(1)]);

  return scale;
}

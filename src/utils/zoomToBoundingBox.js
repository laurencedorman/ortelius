export default ({ bounds, width, height }) => {
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  const scale = Math.max(1, Math.min(10, 0.9 / Math.max(dx / width, dy / height)));

  const x = (bounds[0][0] + bounds[1][0]) / 2;
  const y = (bounds[0][1] + bounds[1][1]) / 2;
  const [tx, ty] = [width / 2 - scale * x, height / 2 - scale * y];

  return [tx, ty, scale];
};

export default function getDrawDims(height, width, margin = 10, toolbar) {
  const drawWidth = width - margin * 2;
  let drawHeight = height - margin * 2;

  if (toolbar) {
    drawHeight = drawHeight - 60;
  }

  return {
    drawHeight,
    drawWidth
  };
}

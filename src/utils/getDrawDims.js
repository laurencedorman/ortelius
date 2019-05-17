export default function getDrawDims(height = 0, width = 0, margin = 10, toolbar) {
  const drawWidth = width - margin * 2;
  let drawHeight = height - margin * 2;

  if (toolbar) {
    drawHeight -= 60;
  }

  return {
    drawHeight,
    drawWidth
  };
}

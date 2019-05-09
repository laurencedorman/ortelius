export default function getDrawDims(height, width, margin = 10) {
  return {
    drawHeight: height - margin * 2,
    drawWidth: width - margin * 2
  };
}

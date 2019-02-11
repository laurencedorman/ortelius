import React from 'react';
import { render } from 'react-dom';

import {
  geoPath,
  geoMercator,
} from 'd3-geo';

const rawWidth = document.documentElement.clientWidth;
const rawHeight = document.documentElement.clientHeight;

const Path = ({ path, id }) => {
  const alertId = (id) => {
    alert(id);
  };

  return (
    <path onClick={alertId.bind(null, id)} d={path} />
  );
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
    };
  }

  onWheel(e) {
    if (e.deltaY < 0) {
      this.zoom(1.05);
    } else {
      this.zoom(0.95);
    }
  }

  onDragStart(e) {
    // Find start position of drag based on touch/mouse coordinates.
    const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
      startX,
      startY,
    };

    this.setState(state);
  }

  onDragMove(e) {
    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return;
    }

    // Get the new x and y coordinates
    const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Take the delta where we are minus where we came from.
    const dx = x - this.state.startX;
    const dy = y - this.state.startY;

    // Pan using the deltas
    this.pan(dx, dy);

    // Update the new startX and startY position
    // because a drag is likely a continuous movement
    this.setState({
      startX: x,
      startY: y,
    });
  }

  onDragEnd() {
    this.setState({ dragging: false });
  }

  pan(dx, dy) {
    const { matrix } = this.state;
    
    matrix[4] += dx;
    matrix[5] += dy;
    
    this.setState({ matrix });
  }

  zoom(scale) {
    const { matrix } = this.state;
    const {
      height,
      width,
    } = this.props;

    const len = matrix.length;

    for (let i = 0; i < len; i += 1) {
      matrix[i] *= scale;
    }

    matrix[4] += (1 - scale) * width / 2;
    matrix[5] += (1 - scale) * height / 2;

    this.setState({ matrix });
  }

  render() {
    const {
      geojson,
      projection,
      height,
      width,
    } = this.props;

    const path = geoPath().projection(projection.fitExtent([
      [0, 0],
      [width, height],
    ], geojson));
  
    const renderPath = datum => (
      <Path
        key={datum.properties.code}
        id={datum.properties.code}
        path={path(datum)}
      />
    );
  
    return (
      <div>
        <svg
          width={width}
          height={height}
          onMouseDown={this.onDragStart.bind(this)}
          onTouchStart={this.onDragStart.bind(this)}
          onMouseMove={this.onDragMove.bind(this)}
          onTouchMove={this.onDragMove.bind(this)}
          onMouseUp={this.onDragEnd.bind(this)}
          onWheel={this.onWheel.bind(this)}
        >
          <g transform={`matrix(${this.state.matrix.join(' ')})`}>
            {geojson.features.map(renderPath)}
          </g>
        </svg>
      </div>
    );
  }
}

fetch('./france-departements-simplified.geojson')
  .then(res => res.json())
  .then((geojson) => {
    render(
      <Map
        geojson={geojson}
        projection={geoMercator()}
        height={rawHeight}
        width={rawWidth}
      />,
      document.getElementById('root'),
    );
  });

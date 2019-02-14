import React from 'react';

export function calculateResizeFactor(actualDimension, baseDimension) {
  if (actualDimension === 0) return 1;
  return 1 / 100 * (100 / actualDimension * baseDimension)
}

export function calculateMousePosition(direction, projection, props, zoom, resizeFactor, center = props.center, width = props.width, height = props.height) {
  const reference = { x: 0, y: 1 }
  const canRotate = !!projection.rotate
  const reverseRotation = !!canRotate ? projection.rotate().map(item => -item) : false
  const point = !!reverseRotation
    ? projection.rotate(reverseRotation)([-center[0],-center[1]])
    : projection([center[0],center[1]])
  const returner = point
    ? (point[reference[direction]] - (reference[direction] === 0 ? width : height) / 2) * zoom * (1/resizeFactor)
    : 0
  if (canRotate) projection.rotate([-reverseRotation[0],-reverseRotation[1],-reverseRotation[2]])
  return !!reverseRotation ? returner : -returner
}

export function createNewChildren(children, props) {
  if (!children) return
  if (!children.length) {
    return isChildOfType(children, ["Geographies"]) ? React.cloneElement(children, {
      projection: props.projection,
    }) : (isChildOfType(children, ["Group", "Markers", "Lines", "Annotations", "Annotation", "Graticule"]) ?
    React.cloneElement(children, {
      projection: props.projection,
      zoom: props.zoom,
      width: props.width,
      height: props.height,
      groupName: props.groupName,
      itemName: props.itemName,
    }) : children)
  }
  else {
    return children.map((child, i) => {
      if (!child) return
      return isChildOfType(child, ["Geographies"]) ?
        React.cloneElement(child, {
          key: `zoomable-child-${i}`,
          projection: props.projection,
        }) : (isChildOfType(child, ["Group", "Markers", "Lines", "Annotations", "Annotation", "Graticule"]) ?
        React.cloneElement(child, {
          key: `zoomable-child-${i}`,
          projection: props.projection,
          zoom: props.zoom,
          width: props.width,
          height: props.height,
          groupName: props.groupName,
          itemName: props.itemName,
        }) : child)
    })
  }
}

export function computeBackdrop(projection, backdrop) {
  const canRotate = projection.rotate
  const originalRotation = canRotate ? projection.rotate() : null

  const tl = canRotate
    ? projection.rotate([0,0,0])([backdrop.x[0],backdrop.y[0]])
    : projection([backdrop.x[0],backdrop.y[0]])

  const br = canRotate
    ? projection.rotate([0,0,0])([backdrop.x[1],backdrop.y[1]])
    : projection([backdrop.x[1],backdrop.y[1]])

  const x = tl ? tl[0] : 0
  const x0 = br ? br[0] : 0

  const y = tl ? tl[1] : 0
  const y0 = br ? br[1] : 0

  const width = x0 - x
  const height = y0 - y

  if (originalRotation) projection.rotate(originalRotation)

  return { x, y, width, height }
}
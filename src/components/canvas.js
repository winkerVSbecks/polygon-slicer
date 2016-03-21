import React from 'react';
import { List } from 'immutable';
import Line from './line';
import Polygons from './polygons';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
const Canvas = ({
  w, h,
  line, polygons,
  swiping,
  onStart, onMove, onEnd,
  slice,
}) => {
  // Start
  const handleTouchStart = e => touchStart(e, onStart);
  const handleMouseDown = e => mouse(e, onStart);
  // Move
  const handleMouseMove = e => {
    if (swiping) { mouse(e, onMove); }
  };
  const handleTouchMove = e => touchStart(e, onMove);
  // End
  const handleTouchEnd = e => touchEnd(e, onEnd);
  const handleMouseUp = e => mouse(e, onEnd);

  const viewBox = [0, 0, w, h].join(' ');

  return (
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={ viewBox }
      onTouchStart={ handleTouchStart }
      onMouseDown={ handleMouseDown }
      onMouseMove={ handleMouseMove }
      onTouchMove={ handleTouchMove }
      onTouchEnd={ handleTouchEnd }
      onMouseUp={ handleMouseUp }>
      <Polygons polygons={ polygons } line={ line } slice={ slice } />
      <Line def={ line } />
    </svg>
  );
};

Canvas.propTypes = {
  w: React.PropTypes.number,
  h: React.PropTypes.number,
  onStart: React.PropTypes.func,
  onMove: React.PropTypes.func,
  onEnd: React.PropTypes.func,
  line: React.PropTypes.object,
  swiping: React.PropTypes.bool,
  polygons: React.PropTypes.instanceOf(List),
  slice: React.PropTypes.func,
};

export default Canvas;


/**
 * Events
 */
function mouse(e, cb) {
  e.preventDefault();
  cb(e.clientX, e.clientY);
}

function touchStart(e, cb) {
  e.preventDefault();
  const touch = e.targetTouches[0];
  cb(touch.clientX, touch.clientY);
}

function touchEnd(e, cb) {
  e.preventDefault();
  const touch = e.changedTouches[0];
  cb(touch.clientX, touch.clientY);
}

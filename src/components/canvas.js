import React from 'react';
import SliceablePolygon from '../components/sliceable-polygon';
import Line from './line';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
const Canvas = ({ w, h, line, swiping, onStart, onMove, onEnd }) => {
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
  const poly = [
    [240 * w / 480, 80 * h / 480],
    [350 * w / 480, 200 * h / 480],
    [400 * w / 480, 320 * h / 480],
    [300 * w / 480, 450 * h / 480],
    [240 * w / 480, 400 * h / 480],
    [80 * w / 480, 320 * h / 480],
  ];

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
      <SliceablePolygon poly={ poly } line={ line } />
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

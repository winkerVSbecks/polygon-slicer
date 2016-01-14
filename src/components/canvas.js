import React from 'react';
import SliceablePolygon from '../components/sliceable-polygon';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
const Canvas = ({ w, h, beginSwipe, endSwipe, line, swiping }) => {

  const handleTouchStart = e => touchStart(e, beginSwipe, true);
  const handleMouseDown = e => mouse(e, beginSwipe, true);
  const handleMouseMove = e => {
    if (swiping) { mouse(e, endSwipe, true); }
  };
  const handleTouchMove = e => touchStart(e, endSwipe, true);
  const handleTouchEnd = e => touchEnd(e, endSwipe, false);
  const handleMouseUp = e => mouse(e, endSwipe, false);

  const viewBox = [0, 0, w, h].join(' ');
  const poly = [
    [240 * w / 480, 80 * h / 480],
    [400 * w / 480, 320 * h / 480],
    [240 * w / 480, 400 * h / 480],
    [80 * w / 480, 320 * h / 480]
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
    </svg>
  );

};

export default Canvas;


/**
 * Events
 */
let swipe = [];
function mouse(e, cb, swiping) {
  e.preventDefault();
  cb(e.clientX, e.clientY, swiping);
}

function touchStart(e, cb, swiping) {
  e.preventDefault();
  const touch = e.targetTouches[0];
  cb(touch.clientX, touch.clientY, swiping);
}

function touchEnd(e, cb, swiping) {
  e.preventDefault();
  const touch = e.changedTouches[0];
  cb(touch.clientX, touch.clientY, swiping);
}

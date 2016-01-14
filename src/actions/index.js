import {
  WINDOW_RESIZE,
  SWIPE_BEGIN,
  SWIPE_END
} from '../actions/constants';

export function windowResize({ width, height }) {

  const w = width >= height ? 100 : width * 100 / height;
  const h = height > width ? 100 : height * 100 / width;

  return { type: WINDOW_RESIZE, width, height, w, h };

}

export function beginSwipe(x, y, swiping) {

  return {
    type: SWIPE_BEGIN,
    location: { x, y },
    swiping
  };

}

export function endSwipe(x, y, swiping) {

  return {
    type: SWIPE_END,
    location: { x, y },
    swiping
  };

}


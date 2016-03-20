import {
  WINDOW_RESIZE,
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  INITIALIZE,
} from '../constants';
import { partial } from 'ramda';

export function windowResize({ width, height }) {
  const w = width >= height ? 100 : width * 100 / height;
  const h = height > width ? 100 : height * 100 / width;

  return { type: WINDOW_RESIZE, width, height, w, h };
}

function touch(type, x, y) {
  return {
    type: type,
    location: { x, y },
  };
}

export const touchStart = partial(touch, [TOUCH_START]);
export const touchMove = partial(touch, [TOUCH_MOVE]);
export const touchEnd = partial(touch, [TOUCH_END]);

export function initializePolygon() {
  return (dispatch, getState) => {
    const w = getState().canvas.get('w');
    const h = getState().canvas.get('h');
    dispatch({ type: INITIALIZE, w, h });
  };
}

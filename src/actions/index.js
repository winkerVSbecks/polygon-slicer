import {
  WINDOW_RESIZE,
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  INITIALIZE,
  SLICE,
} from '../constants';
import { partial } from 'ramda';
import { getSlicedChuncks } from '../utils/slicer';

export function windowResize({ width, height }) {
  const w = width >= height ? 1200 : width * 1200 / height;
  const h = height > width ? 1200 : height * 1200 / width;

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

export function touchEnd(x, y) {
  return (dispatch, getState) => {
    const { polygons, canvas } = getState();
    const line = canvas.get('line').toJS();

    const payload = polygons.asMutable().reduce((res, polygon, index) => {
      const chunks = getSlicedChuncks(polygon.toJS(), line);

      if (chunks) {
        res.toDelete.push(index);
        res.toAdd.push(...chunks);
      }

      return res;
    }, { toDelete: [], toAdd: [] });

    dispatch({
      type: SLICE,
      ...payload,
    });

    dispatch({
      type: TOUCH_END,
      location: { x, y },
    });
  };
}

export function initializePolygon() {
  return (dispatch, getState) => {
    const w = getState().canvas.get('w');
    const h = getState().canvas.get('h');
    dispatch({ type: INITIALIZE, w, h });
  };
}

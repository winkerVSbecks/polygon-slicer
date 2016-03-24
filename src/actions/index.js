import {
  WINDOW_RESIZE,
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  INITIALIZE,
  SLICE,
} from '../constants';
import { partial } from 'ramda';

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
// export const touchEnd = partial(touch, [TOUCH_END]);

export function touchEnd(x, y) {
  return (dispatch, getState) => {
    const { polygons, canvas } = getState();
    const line = canvas.get('line').toJS();

    const payload = polygons.asMutable().reduce((res, polygon, index) => {
      const chunks = chunkItUp(polygon.toJS(), line);
      console.log(polygon.toJS());
      console.log(chunks);
      if (chunks) {
        res.toDelete.push(index);
        res.toAdd.push(...[chunks.chunk1, chunks.chunk2]);
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

export function slice(index, chunks) {
  return dispatch({
    type: SLICE,
    index,
    chunks: [chunks.chunk1, chunks.chunk2],
  });
}

/**
 * TEST
 */
import { getIntersections, split } from '../utils/slicer';
import {aperture} from 'ramda';

export function chunkItUp(poly, line) {
  const intersections = getIntersections(poly, line);
  const sides = [
    ...aperture(2, poly),
    [poly[poly.length - 1], poly[0]],
  ];

  const isValidIntersection = intersections.length === 2;
  return isValidIntersection ? split(sides, intersections) : null;
}

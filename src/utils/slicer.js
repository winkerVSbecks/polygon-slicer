import {shape, intersect} from 'svg-intersections';
import pointOnLine from 'point-on-line';

/**
 * Slicer
 */
export function getIntersections(poly, line) {
  if (!line.x2 || !line.y2) {
    return [];
  }

  return intersect(
    shape('polygon', { points: poly.join(' ') }),
    shape('line', line)
  ).points;
}

export function containsIntersection(side, i) {
  const a = side[0];
  const b = side[1];

  pointOnLine(side, [i.x, i.y]);

  const deltaX = b[0] - a[0];
  const deltaY = b[1] - a[1];
  if (deltaY === 0) {
    return  Math.abs(i.y - a[1]) < 0.001;
  } else if (deltaX === 0) {
    return  Math.abs(i.x - a[0]) < 0.001;
  }

  const m = deltaX === 0 ? 0 : deltaY / deltaX;
  const res = (m * (i.x - a[0])) - (i.y - a[1]);

  return Math.abs(res) < 0.001;


  // const xValid = (a[0] <= b[0]) ? i.x >= a[0] && i.x <= b[0] :
  //                                 i.x >= b[0] && i.x <= a[0];
  // const yValid = (a[1] <= b[1]) ? i.y >= a[1] && i.y <= b[1] :
  //                                 i.y >= b[1] && i.y <= a[1];
  // return xValid && yValid;

  // const slope1 = Math.abs((i.y - a[1]) / (i.x - a[0]));
  // const slope2 = Math.abs((i.y - b[1]) / (i.x - b[0]));
  //
  // console.log(Math.abs(slope1 - slope2));
  //
  // return Math.abs(slope1 - slope2) < 0.1;
}

window.containsIntersection = containsIntersection;

export function hasIntersection(side, intersections) {
  return intersections.reduce((res, i) => {
    return containsIntersection(side, i) ? [i.x, i.y] : res;
  }, null);
}

export function split(sides, intersections) {
  let chunk1Active = false;

  return sides.reduce((chunks, side, idx) => {
    const ints = hasIntersection(side, intersections);
    console.log(idx + 1, ints);

    if (!chunk1Active) {
      if (ints) {
        chunks.chunk1.push(...[side[0], ints]);
        chunks.chunk2.push(...[ints, side[1]]);
        chunk1Active = true;
      } else {
        chunks.chunk1.push(...side);
      }
    } else {
      if (ints) {
        chunks.chunk2.push(...[side[0], ints]);
        chunks.chunk1.push(...[ints, side[1]]);
        chunk1Active = false;
      } else {
        chunks.chunk2.push(...side);
      }
    }

    return chunks;
  }, { chunk1: [], chunk2: [] });
}

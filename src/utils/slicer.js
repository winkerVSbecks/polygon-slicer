import {shape, intersect} from 'svg-intersections';

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

  const xValid = (a[0] <= b[0]) ? i.x >= a[0] && i.x <= b[0] :
                                  i.x >= b[0] && i.x <= a[0];
  const yValid = (a[1] <= b[1]) ? i.y >= a[1] && i.y <= b[1] :
                                  i.y >= b[1] && i.y <= a[1];

  return xValid && yValid;
}

export function hasIntersection(side, intersections) {
  return intersections.reduce((res, i) => {
    return containsIntersection(side, i) ? [i.x, i.y] : res;
  }, null);
}

export function split(sides, intersections) {
  let chunk1Active = false;

  return sides.reduce((poly, side) => {
    const ints = hasIntersection(side, intersections);

    if (!chunk1Active) {
      if (ints) {
        poly.chunk1.push(...[side[0], ints]);
        poly.chunk2.push(...[ints, side[1]]);
        chunk1Active = true;
      } else {
        poly.chunk1.push(...side);
      }
    } else {
      if (ints) {
        poly.chunk2.push(...[side[0], ints]);
        poly.chunk1.push(...[ints, side[1]]);
        chunk1Active = false;
      } else {
        poly.chunk2.push(...side);
      }
    }

    return poly;
  }, { chunk1: [], chunk2: [] });
}

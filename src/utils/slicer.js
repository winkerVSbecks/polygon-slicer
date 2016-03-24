import {shape, intersect} from 'svg-intersections';
import {aperture} from 'ramda';

/**
 * Slicer
 */
export function getIntersections(side, line) {
  const [a, b] = side;
  const sideLine = shape('line', {
    x1: a[0], y1: a[1],
    x2: b[0], y2: b[1],
  });

  const swipe = shape('line', line);
  const result = intersect(sideLine, swipe).points[0];

  return result ? [result.x, result.y] : undefined;
}

export function split(sides, line) {
  if (!line.x1 || !line.y1 || !line.x2 || !line.y2) {
    return undefined;
  }

  let chunk1Active = false;
  let intersectionCount = 0;

  const chunks = sides.reduce((res, side) => {
    const intersection = getIntersections(side, line);

    if (!chunk1Active) {
      if (intersection) {
        res[0].push(...[side[0], intersection]);
        res[1].push(...[intersection, side[1]]);
        chunk1Active = true;
        intersectionCount++;
      } else {
        res[0].push(...side);
      }
    } else {
      if (intersection) {
        res[1].push(...[side[0], intersection]);
        res[0].push(...[intersection, side[1]]);
        chunk1Active = false;
        intersectionCount++;
      } else {
        res[1].push(...side);
      }
    }

    return res;
  }, [[], []]);

  return chunks[1].length > 0 && intersectionCount === 2 ?
    chunks :
    undefined;
}

export function getSlicedChuncks(poly, line) {
  const sides = [
    ...aperture(2, poly),
    [poly[poly.length - 1], poly[0]],
  ];

  return split(sides, line);
}

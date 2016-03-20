import React from 'react';
import {shape, intersect} from 'svg-intersections';
import clrs from '../styles/clrs';
import {aperture} from 'ramda';
import Markers from './markers';
import Line from './line';

const SliceablePolygon = ({ poly, line }) => {
  if (!line.x2 || !line.y2) {
    return (
      <polygon points={ poly.join(' ') }
        fill={ clrs.blue } />
    );
  }

  const intersections = getIntersections(poly, line);
  const sides = [
    ...aperture(2, poly),
    [poly[poly.length - 1], poly[0]],
  ];

  const isValidIntersection = intersections.length === 2;

  if (!isValidIntersection) {
    return (
      <g>
        <polygon points={ poly.join(' ') }
          fill={ clrs.blue } />
        <Line def={ line } />
        <Markers intersections={ intersections } />
      </g>
    );
  }

  const chunks = split(sides, intersections);

  const chunkPolys = isValidIntersection ? [
    <polygon key={ 0 } points={ chunks.chunk1.join(' ') }
      fill={ clrs.red } />,
    <polygon key={ 1 } points={ chunks.chunk2.join(' ') }
      fill={ clrs.orange } />,
  ] : <g></g>;

  return (
    <g>
      { chunkPolys }
      <Line def={ line } />
      <Markers intersections={ intersections } />
    </g>
  );
};

SliceablePolygon.propTypes = {
  poly: React.PropTypes.array,
  line: React.PropTypes.object,
};

export default SliceablePolygon;


/**
 * Utils
 */
function getIntersections(poly, line) {
  return intersect(
    shape('polygon', { points: poly.join(' ') }),
    shape('line', line)
  ).points;
}

function containsIntersection(side, i) {
  const a = side[0];
  const b = side[1];

  const xValid = (a[0] <= b[0]) ? i.x >= a[0] && i.x <= b[0] :
                                  i.x >= b[0] && i.x <= a[0];
  const yValid = (a[1] <= b[1]) ? i.y >= a[1] && i.y <= b[1] :
                                  i.y >= b[1] && i.y <= a[1];

  return xValid && yValid;
}

function hasIntersection(side, intersections) {
  return intersections.reduce((res, i) => {
    return containsIntersection(side, i) ? [i.x, i.y] : res;
  }, null);
}

function split(sides, intersections) {
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

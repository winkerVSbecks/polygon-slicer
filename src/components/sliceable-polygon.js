import React from 'react';
import clrs from '../styles/clrs';
import {aperture} from 'ramda';
import Markers from './markers';
import { getIntersections, split } from '../utils/slicer';

const SliceablePolygon = ({ poly, line }) => {
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
      <Markers intersections={ intersections } />
    </g>
  );
};

SliceablePolygon.propTypes = {
  poly: React.PropTypes.array,
  line: React.PropTypes.object,
};

export default SliceablePolygon;

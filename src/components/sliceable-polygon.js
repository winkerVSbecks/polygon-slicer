import React, { Component } from 'react';
import clrs from '../styles/clrs';
import Markers from './markers';
import {aperture} from 'ramda';
import { getIntersections, split } from '../utils/slicer';

// class SliceablePolygon extends Component {
//
//
//   render() {
//     const { poly } = this.props;
//     return (
//       <g>
//         <polygon
//           points={ poly.join(' ') }
//           fill={ clrs.blue }
//           stroke={ clrs.purple } />
//       </g>
//     );
//   }
//
// }

class SliceablePolygon extends Component {

  componentDidUpdate() {
    // const { index, slice } = this.props;
    // slice(index);
  }

  render() {
    const { poly, line } = this.props;
    const intersections = getIntersections(poly, line);
    const sides = [
      ...aperture(2, poly),
      [poly[poly.length - 1], poly[0]],
    ];

    const isValidIntersection = intersections.length === 2;

    if (!isValidIntersection) {
      return (
        <g>
          <polygon
            points={ poly.join(' ') }
            fill={ clrs.blue }
            stroke={ clrs.purple } />
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
  }

}

SliceablePolygon.propTypes = {
  poly: React.PropTypes.array,
  line: React.PropTypes.object,
  slice: React.PropTypes.func,
  index: React.PropTypes.number,
};

export default SliceablePolygon;

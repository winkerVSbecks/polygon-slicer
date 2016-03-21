import React from 'react';
import { List } from 'immutable';
import SliceablePolygon from '../components/sliceable-polygon';

/**
 * Polygons
 */
const Polygons = ({ line, polygons, slice }) => {
  if (polygons.size > 0) {
    return (
      <g>
        {
          polygons.map((poly, idx) => (
            <SliceablePolygon
              poly={ poly.toJS() }
              line={ line }
              slice={ slice }
              index={ idx }
              key={ idx } />
          ))
        }
      </g>
    );
  }

  return <g></g>;
};

Polygons.propTypes = {
  line: React.PropTypes.object,
  polygons: React.PropTypes.instanceOf(List),
  slice: React.PropTypes.func,
};

export default Polygons;

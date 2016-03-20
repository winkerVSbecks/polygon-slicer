import React from 'react';
import SliceablePolygon from '../components/sliceable-polygon';

/**
 * Polygons
 */
const Polygons = ({ line, polygons }) => {
  if (polygons.length > 0) {
    return (
      <g>
        {
          polygons.map((poly, idx) => (
            <SliceablePolygon poly={ poly }
              line={ line }
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
  polygons: React.PropTypes.array,
};

export default Polygons;

import React from 'react';
import clrs from '../styles/clrs';

const Markers = ({ intersections }) => {
  return (
    <g>
      {
        intersections.map((pt, idx) => {
          return (
            <circle cx={ pt.x } cy={ pt.y }
              r={ 6 }
              stroke={ clrs.purple }
              strokeWidth={ 2 }
              fill="none"
              key={ idx } />
          );
        })
      }
    </g>
  );
};

Markers.propTypes = {
  intersections: React.PropTypes.array,
};

export default Markers;

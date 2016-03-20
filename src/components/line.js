import React from 'react';
import clrs from '../styles/clrs';

/**
 * Line
 */
const Line = ({ def }) => {
  if (def.x1 && def.x2 && def.y1 && def.y2) {
    return (
      <line x1={ def.x1 } y1={ def.y1 }
        x2={ def.x2 } y2={ def.y2 }
        strokeWidth={ 2 }
        stroke={ clrs.yellow } />
    );
  }

  return <g></g>;
};

Line.propTypes = {
  def: React.PropTypes.object,
};

export default Line;

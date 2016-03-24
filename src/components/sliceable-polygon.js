import React from 'react';
import clrs from '../styles/clrs';

const SliceablePolygon = ({ poly }) => {
  return (
    <polygon
      points={ poly.join(' ') }
      fill={ clrs.blue }
      stroke={ clrs.purple } />
  );
};

SliceablePolygon.propTypes = {
  poly: React.PropTypes.array,
  line: React.PropTypes.object,
  slice: React.PropTypes.func,
  index: React.PropTypes.number,
};

export default SliceablePolygon;

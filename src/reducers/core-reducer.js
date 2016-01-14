import {
  WINDOW_RESIZE,
  SWIPE_BEGIN,
  SWIPE_END
} from '../actions/constants';
import * as R from 'ramda';

const initialState = {
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  line: [],
  swiping: false
};

/**
 * Core action handlers
 * @param  {Object} state
 * @param  {Object} action
 */
export default function core(state = initialState, action) {

  switch (action.type) {

    case WINDOW_RESIZE:
      return R.merge(state, {
        w: action.w,
        h: action.h,
        width: action.width,
        height: action.height
      });

    case SWIPE_BEGIN:
      const head = getLocation(state, action.location);
      return R.merge(state, {
        line: {
          x1: head.x,
          y1: head.y
        },
        swiping: action.swiping
      });

    case SWIPE_END:
      const tail = getLocation(state, action.location);
      return R.merge(state, {
        line: {
          x1: state.line.x1,
          y1: state.line.y1,
          x2: tail.x,
          y2: tail.y
        },
        swiping: action.swiping
      });

    default:
      return state;
  }

}


function getLocation(state, l) {
  const x = l.x * state.w / state.width;
  const y = l.y * state.h / state.height;
  return { x, y };
}

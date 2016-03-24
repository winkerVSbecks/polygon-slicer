import {
  WINDOW_RESIZE,
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  width: 100,
  height: 100,
  w: 100,
  h: 100,
  line: {},
  swiping: false,
});

function canvasReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case WINDOW_RESIZE:
    return state.mergeDeep({
      w: action.w,
      h: action.h,
      width: action.width,
      height: action.height,
    });

  case TOUCH_START:
    const head = getLocation(state, action.location);
    return state.mergeDeep({
      line: {
        x1: head.x,
        y1: head.y,
        x2: undefined,
        y2: undefined,
      },
      swiping: true,
    });

  case TOUCH_MOVE:
    const movingTail = getLocation(state, action.location);
    return state.mergeIn(['line'], {
      x2: movingTail.x,
      y2: movingTail.y,
    });

  case TOUCH_END:
    // const tail = getLocation(state, action.location);
    return state.mergeDeep({
      line: {
        x1: undefined,
        y1: undefined,
        x2: undefined,
        y2: undefined,
      },
      swiping: false,
    });

  default:
    return state;
  }
}

export default canvasReducer;

function getLocation(state, l) {
  const x = l.x * state.get('w') / state.get('width');
  const y = l.y * state.get('h') / state.get('height');
  return { x, y };
}

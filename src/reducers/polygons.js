import {
  INITIALIZE,
  SLICE,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS([]);

function polygonsReducer(state = INITIAL_STATE, action = {}) {
  const { w, h } = action;

  switch (action.type) {
  case INITIALIZE:
    return state.push(fromJS([
      [240 * w / 480, 80 * h / 480],
      [350 * w / 480, 200 * h / 480],
      [400 * w / 480, 320 * h / 480],
      [300 * w / 480, 450 * h / 480],
      [240 * w / 480, 400 * h / 480],
      [80 * w / 480, 320 * h / 480],
    ]));

  case SLICE:
    const ns1 = state.delete(action.index);
    return ns1.push(...fromJS(action.chunks));

  default:
    return state;
  }
}

export default polygonsReducer;

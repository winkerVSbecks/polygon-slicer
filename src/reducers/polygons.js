import {
  INITIALIZE,
  SLICE,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS([]);

function polygonsReducer(state = INITIAL_STATE, action = {}) {
  // const { w, h } = action;

  switch (action.type) {
  case INITIALIZE:
    return state.push(...fromJS([
      [
        [0.5 * 500, 0.25 * 500],
        [0.75 * 500, 0.25 * 500],
        [0.75 * 500, 0.75 * 500],
        [0.25 * 500, 0.75 * 500],
      ],
      [
        [240 * 500 / 480, 80 * 500 / 480 + 350],
        [350 * 500 / 480, 200 * 500 / 480 + 350],
        [400 * 500 / 480, 320 * 500 / 480 + 350],
        [300 * 500 / 480, 450 * 500 / 480 + 350],
        [240 * 500 / 480, 400 * 500 / 480 + 350],
        [80 * 500 / 480, 320 * 500 / 480 + 350],
      ],
    ]));

  case SLICE:
    return state.filter((a, idx) => {
      return action.toDelete.indexOf(idx) === -1;
    })
    .push(...fromJS(action.toAdd));

  default:
    return state;
  }
}

export default polygonsReducer;

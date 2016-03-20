import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import canvas from './canvas';

const rootReducer = combineReducers({
  canvas,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;

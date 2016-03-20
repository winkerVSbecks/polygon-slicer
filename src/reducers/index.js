import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import canvas from './canvas';
import polygons from './polygons';

const rootReducer = combineReducers({
  canvas,
  polygons,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;

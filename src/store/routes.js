import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../containers/app';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ App }/>
  </Route>
);

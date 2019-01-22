import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import registerServiceWorker from './registerServiceWorker';
import 'react-toastify/dist/ReactToastify.css';

import App from './Components/App';
import { Home, Login, NotFound, Admin } from './Views';


ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/login" component={ Login } />

    <Route exact path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/admin" component={ Admin } />
    </Route>

    <Route path="*" component={ NotFound } />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();

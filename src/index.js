import React from 'react';
import ReactDOM from 'react-dom';
import SGF from 'sgfjs';
import { Provider } from 'react-redux';

import Application from './containers/Application';
import normalizeSGFTree from './utils/normalizeSGFTree';
import configureStore from './store/configureStore';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Application/>
  </Provider>,
  document.body
);

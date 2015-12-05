import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

let configureStore = (initialState) => {
  return createStore(rootReducer, initialState);
}

if (process.env.NODE_ENV !== 'production') {
  const finalCreateStore = compose(
    applyMiddleware(createLogger()),
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
  )(createStore);

  configureStore = (initialState) => {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers'))
      );
    }

    return store;
  }
}

export default configureStore;

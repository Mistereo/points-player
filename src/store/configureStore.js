import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { identity } from 'lodash';

import reducers from '../reducers';


const middlewares = [thunk];
const devToolsExtension = window.devToolsExtension;

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(...middlewares),
    devToolsExtension ? devToolsExtension() : identity
  );

  const store = createStore(
    reducers,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}

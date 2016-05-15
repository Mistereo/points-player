import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Application from './Application';
import DevTools from './DevTools';

const Root = ({
  store,
}) => (
  <Provider store={store}>
    {process.env.NODE_ENV === 'production' ?
      <Application /> :
      <div>
        <Application />
        <DevTools />
      </div>}
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;

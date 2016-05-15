import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import Application from './Application'

const Root = ({
  store,
}) => (
  <Provider store={store}>
    <Application />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root

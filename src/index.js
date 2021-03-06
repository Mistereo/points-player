import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import whyDidYouUpdate from 'why-did-you-update'

import Root from './containers/Root'
import configureStore from './store/configureStore'

import sampleSGF from './data/sampleSGF'


if (__DEVELOPMENT__) {
  console.info('Why did you update enabled.')
  whyDidYouUpdate(React)
}

const store = configureStore()

const MOUNT_NODE = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  MOUNT_NODE
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./containers/Root').default
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      MOUNT_NODE
    )
  })
}

store.dispatch({
  type: 'LOAD_SGF',
  payload: sampleSGF,
})

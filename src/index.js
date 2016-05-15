import React from 'react'
import ReactDOM from 'react-dom'

import whyDidYouUpdate from 'why-did-you-update'

import Root from './containers/Root'
import configureStore from './store/configureStore'

import sampleSGF from './data/sampleSGF'


if (__DEVELOPMENT__) {
  console.info('Why did you update enabled.')
  whyDidYouUpdate(React)
}

const store = configureStore()

ReactDOM.render(
  <Root store={store} />,
  document.body
)

store.dispatch({
  type: 'LOAD_SGF',
  payload: sampleSGF,
})

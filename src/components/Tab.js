import React, { PropTypes } from 'react'
import classNames from 'classnames'

import { pure } from 'recompose'

const Tab = ({
  children,
  className,
  active = false,
}) => {
  const classes = classNames(
    className,
    'tabs__content', {
      'is-active': active,
    })
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Tab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
}

export default pure(Tab)

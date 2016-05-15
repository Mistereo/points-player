import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Tab = ({
  className,
  onClick,
  isActive = false,
  children = '',
}) => {
  const classes = classNames(
    className,
    'tabs__tab', {
      'is-active': isActive,
    });
  return <a href="#" className={classes} onClick={onClick}>{children}</a>;
};

Tab.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  children: PropTypes.node,
};

export default Tab;

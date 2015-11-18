import React from 'react';
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

export default Tab;

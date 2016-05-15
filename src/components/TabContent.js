import React, { PropTypes } from 'react';
import classNames from 'classnames';

const TabContent = ({
  children,
  className,
  isActive = false,
}) => {
  const classes = classNames(
    className,
    'tabs__content', {
      'is-active': isActive,
    });
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

TabContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

export default TabContent;

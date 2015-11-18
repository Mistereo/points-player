import React from 'react';
import classNames from 'classnames';


function upgrade(node) {
  if (window.componentHandler) {
    window.componentHandler.upgradeElement(node);
  }
}

const IconButton = ({
  icon = 'lens',
  onClick,
  clasName,
}) => {
  const classes = classNames(
    clasName,
    'mdl-button',
    'mdl-button--icon',
    'mdl-js-button'
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      ref={upgrade}>
      <i className="material-icons">{icon}</i>
    </button>
  );
};

export default IconButton;

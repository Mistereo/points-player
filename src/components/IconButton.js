import React, { Component } from 'react';
import classNames from 'classnames';


export default class IconButton extends Component {
  componentDidMount() {
    window.componentHandler.upgradeElement(this.button);
  }
  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.button);
  }
  render() {
    const {
      icon = 'lens',
      onClick,
      className,
      ...otherProps,
    } = this.props;

    const classes = classNames(
      className,
      'mdl-button',
      'mdl-button--icon',
      'mdl-js-button'
    );

    return (
      <button
        {...otherProps}
        className={classes}
        onClick={onClick}
        ref={node => { this.button = node; }}>
        <i className="material-icons">{icon}</i>
      </button>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';


class IconButton extends Component {
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
        ref={node => { this.button = node; }}
      >
        <i className="material-icons">{icon}</i>
      </button>
    );
  }
}

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default IconButton;

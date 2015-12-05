import React, { Component } from 'react';
import classNames from 'classnames';

export default class MDLMenu extends Component {
  componentDidMount() {
    window.componentHandler.upgradeElement(this.menu);
  }
  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.menu);
  }
  render() {
    const {
      clasName,
      target,
      items = [],
      ...otherProps,
    } = this.props;

    const classes = classNames(
      clasName,
      'mdl-menu',
      'mdl-menu--bottom-right',
      'mdl-js-menu',
    );

    return (
      <ul {...otherProps}
          className={classes}
          htmlFor={target}
          ref={node => { this.menu = node }}>
        {items.map((item, key) =>
          <li className="mdl-menu__item"
              onClick={item.onClick}
              key={key}>{item.title}</li>
        )}
      </ul>
    );
  }
}

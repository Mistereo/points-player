import '../styles/tabs.css';

import React, {
  Children,
  PropTypes,
  cloneElement,
} from 'react';
import classNames from 'classnames';

import { pure, withState, compose } from 'recompose';
import assign from 'lodash/assign';
import partial from 'lodash/partial';
import noop from 'lodash/noop';


const Tabs = ({
  className,

  active,
  onSelect,

  children,
}) => {
  const classes = classNames(className, 'tabs');

  const tabsCount = Children.count(children);

  let activeIndex = 0;
  Children.forEach(children, (tab, index) => {
    if (tab.key === active) {
      activeIndex = index;
    }
  });

  const sliderWidth = 100 / tabsCount;
  const sliderLeft = sliderWidth * activeIndex;

  const sliderStyles = {
    width: `${sliderWidth}%`,
    left: `${sliderLeft}%`,
  };

  const current = String(active);

  return (
    <div className={classes}>
      <div className="tabs__tab-bar">
        {Children.map(children, (tab) => {
          const headerClasses = classNames('tabs__tab', {
            'is-active': tab.key === current,
          });

          return (
            <a
              href="#"
              className={headerClasses}
              onClick={partial(onSelect, tab.key, noop)}
            >{tab.props.title}</a>
          );
        })}
        <div className="tabs__slider" style={sliderStyles}></div>
      </div>
      {Children.map(children, (tab) => {
        const props = assign({}, tab.props, {
          key: tab.key,
          ref: tab.ref,
          active: tab.key === current,
        });

        return cloneElement(tab, props);
      })}
    </div>
  );
};

Tabs.propTypes = {
  className: PropTypes.string,
  active: PropTypes.any,
  onSelect: PropTypes.func,
  children: PropTypes.node,
};

const enhance = compose(
  pure,
  withState('active', 'onSelect', props => props.active)
);

export default enhance(Tabs);

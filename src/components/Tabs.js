import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Tab from './Tab';
import TabContent from './TabContent';

import '../styles/tabs.css';


export default class Tabs extends Component {
  static propTypes = {
    activeTab: PropTypes.number,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node,
      content: PropTypes.node,
    })),
    className: PropTypes.string,
  };
  static defaultProps = {
    activeTab: 0,
    tabs: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab,
    };
  }
  selectTab(id) {
    this.setState({
      activeTab: id,
    });
  }
  render() {
    const { className, tabs } = this.props;
    const { activeTab } = this.state;

    const classes = classNames(
      className,
      'tabs',
    );

    const sliderWidth = 100 / tabs.length;
    const sliderLeft = sliderWidth * activeTab;

    const sliderStyles = {
      width: `${sliderWidth}%`,
      left: `${sliderLeft}%`,
    };

    return (
      <div className={classes}>
        <div className="tabs__tab-bar">
          {tabs.map((tab, id) =>
            <Tab onClick={this.selectTab.bind(this, id)} key={id}
                 isActive={id === activeTab}>
              {tab.label}
            </Tab>
          )}
          <div className="tabs__slider" style={sliderStyles}></div>
        </div>
        {tabs.map((tab, id) =>
          <TabContent isActive={id === activeTab} key={id}>
            {tab.content}
          </TabContent>
        )}
      </div>
    );
  }
}

export default Tabs;

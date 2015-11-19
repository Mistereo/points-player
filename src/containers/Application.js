import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Player from '../components/Player';
import Header from '../components/Header';
import * as Actions from '../actions';
import rootSelector from '../selectors';


class Application extends Component {
  render() {
    const props = this.props;
    return (
      <div className="container">
        <Header {...props}/>
        <main className="content">
          <Player {...props}/>
        </main>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  rootSelector,
  mapDispatchToProps
)(Application);

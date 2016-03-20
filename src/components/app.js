import React, { Component, PropTypes } from 'react';
import css from '../app.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Canvas from '../components/canvas';
import * as R from 'ramda';

class App extends Component {

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.handleResize(), 300);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return <Canvas { ...this.props } />
  }

};


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect((state) => state, mapDispatchToProps)(App);

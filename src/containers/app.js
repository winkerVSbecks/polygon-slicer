import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, touchStart, touchMove, touchEnd } from '../actions';
import Canvas from '../components/canvas';

function mapStateToProps(state) {
  return {
    canvas: state.canvas.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    windowResize: payload => dispatch(windowResize(payload)),
    touchStart: (x, y) => dispatch(touchStart(x, y)),
    touchMove: (x, y) => dispatch(touchMove(x, y)),
    touchEnd: (x, y) => dispatch(touchEnd(x, y)),
  };
}

class App extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.handleResize(), 300);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <Canvas { ...this.props.canvas }
      onStart={ this.props.touchStart }
      onMove={ this.props.touchMove }
      onEnd={ this.props.touchEnd } />
    );
  }

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

}

App.propTypes = {
  children: React.PropTypes.node,
  canvas: React.PropTypes.object,
  windowResize: React.PropTypes.func,
  touchStart: React.PropTypes.func,
  touchMove: React.PropTypes.func,
  touchEnd: React.PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

import React, { Component, PropTypes } from 'react';

import GameRenderer from '../lib/GameRenderer';
import Game from '../lib/Game.js';

class CanvasField extends Component {
  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const {
      game,
      ...otherProps,
    } = this.props;

    this.renderer = new GameRenderer({
      ...otherProps,
      canvas: this.canvas,
      xSize: game.width,
      ySize: game.height,
      onClick: this.handleClick,
    });

    this.renderGame();
  }
  componentDidUpdate() {
    this.renderGame();
  }
  handleClick(...args) {
    const {
      onClick,
    } = this.props;

    onClick(...args);
  }
  renderGame() {
    const {
      game,
      activeNode,
    } = this.props;

    this.renderer.renderGame(game);
    this.renderer.renderLastMoveMarker(activeNode);
  }
  render() {
    const {
      className,
      children,
    } = this.props;

    return (
      <canvas
        className={className}
        ref={canvas => (this.canvas = canvas)}
      >
        {children}
      </canvas>
    );
  }
}

CanvasField.propTypes = {
  game: PropTypes.instanceOf(Game).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  activeNode: PropTypes.object,
};

export default CanvasField;

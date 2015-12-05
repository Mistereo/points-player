import React, { PropTypes } from 'react';

import GameRenderer from 'lib/GameRenderer';
import Game from 'lib/Game.js';


const CanvasField = ({
  game,
  className,
  children = 'Canvas unsupported.',
  onClick,
  ...otherProps
}) => (
  <canvas
    className={className}
    ref={(canvas) => {
      const renderer = new GameRenderer({
        ...otherProps,
        canvas,
        xSize: game.width,
        ySize: game.height,
        onClick
      });
      renderer.renderGame(game);
    }}>{children}</canvas>
);

CanvasField.propTypes = {
  game: PropTypes.instanceOf(Game).isRequired
};

export default CanvasField;

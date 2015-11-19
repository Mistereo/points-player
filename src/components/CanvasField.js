import React from 'react';

import GameRenderer from 'lib/GameRenderer';
import Game from 'lib/Game.js';


const CanvasField = ({
  width = 39,
  height = 32,
  moves = [],
  className,
  children = 'Canvas unsupported.',
  ...otherProps,
}) => (
  <canvas
    className={className}
    ref={(canvas) => {
      const game = new Game({ width, height });
      moves.forEach(move => {
        if (game.check(move)) {
          game.apply(move);
        }
      });

      new GameRenderer({
        canvas,
        xSize: width,
        ySize: height,
        ...otherProps,
      }).renderGame(game);
    }}>{children}</canvas>
);

export default CanvasField;

import CanvasRenderer from './CanvasRenderer';
import { BLUE } from '../constants/colors';

const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [1, 1, 0, -1, -1, -1, 0, 1];

export default class GameRenderer extends CanvasRenderer {
  renderGame(game) {
    const { xSize, ySize, blueColor, redColor, alpha } = this.options;
    const { ctx, proxy } = this;

    this.clear();
    for (let x = 0; x < xSize; x++) {
      for (let y = 0; y < ySize; y++) {
        if (game.busy({ x, y })) {
          this.renderPoint({ x, y, color: game.color({ x, y }) });
        }
        if (game.captured({ x, y })) {
          const owner = game.owner({ x, y });
          proxy.save();
          proxy.lineWidth = 0.5;
          proxy.fillStyle = proxy.strokeStyle = (owner === BLUE) ?
            blueColor :
            redColor;
          proxy.beginPath();
          let started = false;
          for (let t = 0; t < 8; t++) {
            const pos = {
              x: x + dx[t],
              y: y + dy[t],
            };
            if (game.owner(pos) === owner || game.color(pos) === owner) {
              const cx = this.cc(pos.x);
              const cy = this.cc(pos.y);
              if (!started) {
                proxy.moveTo(cx, cy);
                started = true;
              } else {
                proxy.lineTo(cx, cy);
              }
            }
          }
          proxy.closePath();
          proxy.fill();
          proxy.stroke();
          proxy.restore();
        }
      }
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(this.proxyCanvas, 0, 0);
    ctx.restore();
  }
}

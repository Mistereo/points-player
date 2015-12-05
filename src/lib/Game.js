import { EMPTY, BLUE, RED } from '../constants/colors';
import Field from './Field';


const dx = [0, 1, 0, -1, 1, 1, -1, -1];
const dy = [1, 0, -1, 0, 1, -1, -1, 1];

export default class Game extends Field {
  constructor({
    width = 30,
    height = 30,
  }) {
    super(width, height);
    this.moving = BLUE;
  }
  check({ x, y }) {
    return this.contains({ x, y }) &&
           this.empty({ x, y }) &&
           this.free({ x, y });
  }
  place({ x, y, color }) {
    this.set({ x, y }, {
      color,
      owner: EMPTY,
    });
  }
  apply({ x, y, color }) {
    this.place({ x, y, color });

    let somethingCaptured = false;
    for (let t = 0; t < 4; t++) {
      const captured = this.findCaptured(x + dx[t], y + dy[t], color);
      if (captured.length) {
        somethingCaptured = true;
        captured.forEach(pos => this.owner(pos, color));
      }
    }

    if (!somethingCaptured) {
      const opponentColor = (color === BLUE) ? RED : BLUE;
      const captured = this.findCaptured(x, y, opponentColor);
      captured.forEach(pos => this.owner(pos, opponentColor));
    }

    this.moving = (color === BLUE) ? RED : BLUE;
  }
  findCaptured(sx, sy, color) {
    const used = {};
    const queue = [];
    const captured = [];
    queue.push({ x: sx, y: sy });

    let enemy = false;
    while (queue.length) {
      const pos = queue.pop();
      const id = this.id(pos);

      if (!this.contains(pos)) {
        return [];
      }

      if (used[id] || this.free(pos) && this.color(pos) === color) {
        continue;
      }

      used[id] = true;
      if (this.owner(pos) !== color) {
        captured.push(pos);

        if (!this.empty(pos)) {
          enemy = true;
        }
      }

      for (let t = 0; t < 4; t++) {
        queue.push({
          x: pos.x + dx[t],
          y: pos.y + dy[t],
        });
      }
    }

    return enemy ? captured : [];
  }
}

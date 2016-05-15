import { EMPTY } from '../constants/colors'

export default class Field {
  static fromObject(obj) {
    return Object.assign(new Field(0, 0), obj)
  }
  constructor(width = 30, height = 30) {
    this.state = []
    this.width = width
    this.height = height

    for (let i = 0; i < width * height; i++) {
      this.state.push({
        color: EMPTY,
        owner: EMPTY,
      })
    }
  }
  id({ x, y }) {
    return y * this.width + x
  }
  contains({ x, y }) {
    // eslint-disable-next-line
    return 0 <= x && x < this.width && 0 <= y && y < this.height
  }
  get(pos) {
    const id = this.id(pos)
    return this.state[id]
  }
  set(pos, { color, owner }) {
    const id = this.id(pos)
    this.state[id] = { color, owner }
  }
  color(pos, color) {
    if (typeof color !== 'undefined') {
      this.get(pos).color = color
    }
    return this.get(pos).color
  }
  owner(pos, owner) {
    if (typeof owner !== 'undefined') {
      this.get(pos).owner = owner
    }
    return this.get(pos).owner
  }
  empty(pos) {
    const id = this.id(pos)
    return this.state[id].color === EMPTY
  }
  busy(pos) {
    return !this.empty(pos)
  }
  captured(pos) {
    return !this.free(pos)
  }
  free(pos) {
    const id = this.id(pos)
    return this.state[id].owner === EMPTY
  }
  toObject() {
    const { width, height, state } = this
    return { width, height, state }
  }
}

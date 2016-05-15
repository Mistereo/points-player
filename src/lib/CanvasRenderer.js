import { BLUE } from '../constants/colors'


export default class CanvasRenderer {

  static defaults = {
    blueColor: '#4169E1',
    redColor: '#DC143C',
    gridColor: '#DDDDDD',

    margin: 10,
    xSize: 39,
    ySize: 32,
    cellSize: 18,
    pointRadius: 5,

    alpha: 0.6,
    lastMoveMarker: 0,
    lineWidth: 1,
    borderWidth: 0,

    onClick: () => {},
  };

  constructor(options = {}) {
    this.canvas = options.canvas || document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.proxyCanvas = document.createElement('canvas')
    this.proxy = this.proxyCanvas.getContext('2d')

    this.options = {
      ...CanvasRenderer.defaults,
      ...options,
    }

    this.canvas.width = this.proxyCanvas.width = this.width()
    this.canvas.height = this.proxyCanvas.height = this.height()
    this.canvas.onclick = (event) => {
      const { margin, cellSize, onClick } = this.options
      const rect = this.canvas.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top

      x = Math.abs(Math.round((x - margin - 1) / cellSize))
      y = Math.abs(Math.round((y - margin - 1) / cellSize))

      onClick.call(this, { x, y }, event)
    }

    this.clear()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width(), this.height())
    this.proxy.clearRect(0, 0, this.width(), this.height())
    this.renderGrid()
  }

  cc(x) {
    const { margin, cellSize } = this.options
    return margin + x * cellSize + 0.5
  }

  width() {
    const { margin, cellSize, xSize } = this.options
    return (2 * margin + cellSize * (xSize - 1) + 1)
  }

  height() {
    const { margin, cellSize, ySize } = this.options
    return (2 * margin + cellSize * (ySize - 1) + 1)
  }

  renderGrid() {
    const { xSize, ySize, gridColor, lineWidth } = this.options

    const width = this.width()
    const height = this.height()

    const ctx = this.ctx

    ctx.save()
    ctx.strokeStyle = gridColor
    ctx.lineWidth = lineWidth

    for (let i = 0; i < xSize; i++) {
      const x = this.cc(i)
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let i = 0; i < ySize; i++) {
      const y = this.cc(i)
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    ctx.restore()

    return this
  }

  renderPoint({ x, y, color }) {
    const { blueColor, redColor, pointRadius } = this.options
    const ctx = this.ctx

    ctx.save()
    ctx.lineWidth = 0
    ctx.fillStyle = (color === BLUE) ? blueColor : redColor
    ctx.beginPath()
    ctx.arc(this.cc(x), this.cc(y), pointRadius + 0.5, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()

    return this
  }

  renderClosure(closure) {
    const { points, color } = closure
    const { blueColor, redColor, alpha, borderWidth } = this.options
    const ctx = this.ctx

    ctx.save()
    ctx.lineWidth = borderWidth
    ctx.fillStyle = (color === BLUE) ? blueColor : redColor
    ctx.strokeStyle = ctx.fillStyle

    ctx.beginPath()

    const { x, y } = points.shift()
    ctx.moveTo(this.cc(x), this.cc(y))
    points.forEach(
      (point) => ctx.lineTo(this.cc(point.x), this.cc(point.y))
    )

    ctx.closePath()
    ctx.globalAlpha = alpha
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.stroke()
    ctx.restore()

    return this
  }

  renderLastMoveMarker({ x, y }) {
    const { pointRadius } = this.options
    const ctx = this.ctx

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#FFF'
    ctx.arc(this.cc(x), this.cc(y), Math.floor(pointRadius / 2) + 0.5, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()

    return this
  }

  getCanvas() {
    return this.canvas
  }

  toDataURL(...args) {
    return this.canvas.toDateURL(...args)
  }
}

import { maxMercatorLatitude } from './Epsg3857Coordinate'

export default class MapState {
  width: number
  height: number
  scale: number
  left: number
  top: number
  constructor({
    width = window.innerWidth,
    height = window.innerHeight,
    scale = 0,
    left = -180,
    top = maxMercatorLatitude,
  }: {
    width?: number
    height?: number
    scale?: number
    left?: number
    top?: number
  }) {
    this.width = width
    this.height = height
    this.scale = scale
    this.left = left
    this.top = top
  }
  pan(dx: number, dy: number): MapState {
    const tileSize =
      Math.min(this.width, this.height) * Math.pow(2, this.scale)
    return new MapState({
      ...this,
      left: this.left - (dx * 360) / tileSize,
      top: this.top + (dy * 180) / tileSize,
    })
  }
}

import { maxMercatorLatitude } from './Epsg3857Coordinate'

export default class MapState {
  width: number
  height: number
  scale: number
  left: number
  top: number
  tileSize: number
  constructor({
    width = window.innerWidth,
    height = window.innerHeight,
    scale = 0,
    left = -180,
    top = maxMercatorLatitude,
    tileSize = 256,
  }: {
    width?: number
    height?: number
    scale?: number
    left?: number
    top?: number
    tileSize?: number
  }) {
    this.width = width
    this.height = height
    this.scale = scale
    this.left = left
    this.top = top
    this.tileSize = tileSize
  }
  pan(dx: number, dy: number): MapState {
    const scaledTileSize = this.tileSize * Math.pow(2, this.scale)
    return new MapState({
      ...this,
      left: this.left - (dx * 360) / scaledTileSize,
      top: this.top + (dy * 180) / scaledTileSize,
    })
  }
}

import {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from './Epsg3857Coordinate'

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
    left = -maxMercatorLongitude,
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
      left: this.left - (dx * maxMercatorLongitude * 2) / scaledTileSize,
      top: this.top + (dy * maxMercatorLatitude * 2) / scaledTileSize,
    })
  }
  zoom(dz: number, x: number, y: number): MapState {
    const lastScale = this.scale
    const nextScale = lastScale - dz
    const dInverseScaledTileSize =
      (Math.pow(2, -lastScale) - Math.pow(2, -nextScale)) / this.tileSize

    return new MapState({
      ...this,
      scale: nextScale,
      left:
        this.left +
        2 * this.width * maxMercatorLongitude * dInverseScaledTileSize * x,
      top:
        this.top +
        2 *
          this.height *
          -maxMercatorLatitude *
          dInverseScaledTileSize *
          y,
    })
  }
}

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
  zoom(dz: number): MapState {
    return new MapState({
      ...this,
      scale: this.scale - dz / 114 / 8,
    })
  }
}

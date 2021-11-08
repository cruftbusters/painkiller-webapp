import Epsg3857Coordinate from './Epsg3857Coordinate'
import { maxMercatorLatitude } from './Epsg3857Coordinate'
import MapState from './MapState'

export default class MapPixel {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  toEpsg3857Coordinate({
    scale,
    left,
    top,
  }: MapState): Epsg3857Coordinate {
    const tileSize = 256 * Math.pow(2, scale)
    return new Epsg3857Coordinate(
      (this.x / tileSize) * 360 + left,
      top - (this.y / tileSize) * 2 * maxMercatorLatitude,
    )
  }
}

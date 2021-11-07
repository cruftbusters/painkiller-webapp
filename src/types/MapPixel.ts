import Epsg4326Coordinate, {
  maxMercatorLatitude,
} from './Epsg4326Coordinate'
import MapState from './MapState'

export default class MapPixel {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  toEpsg4326Coordinate({ width, height, scale, x, y }: MapState): any {
    const tileSize = Math.min(width, height) * Math.pow(2, scale)
    return new Epsg4326Coordinate(
      (this.x / tileSize) * 360 + x,
      y - (this.y / tileSize) * 2 * maxMercatorLatitude,
    )
  }
}

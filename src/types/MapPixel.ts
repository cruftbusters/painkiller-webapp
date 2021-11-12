import Epsg3857Coordinate, {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from './Epsg3857Coordinate'
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
    tileSize,
    left,
    top,
  }: MapState): Epsg3857Coordinate {
    const scaledTileSize = tileSize * Math.pow(2, scale)
    return new Epsg3857Coordinate(
      (this.x / scaledTileSize) * 2 * maxMercatorLongitude + left,
      top - (this.y / scaledTileSize) * 2 * maxMercatorLatitude,
    )
  }
}

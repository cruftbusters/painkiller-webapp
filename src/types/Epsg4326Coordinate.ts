import MapState from './MapState'
import MapPixel from './MapPixel'

export default class Epsg4326Coordinate {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  toMapPixel(screen: MapState): MapPixel {
    const tileSize =
      Math.min(screen.width, screen.height) * Math.pow(2, screen.scale)
    return new MapPixel(
      ((this.x - screen.x) / 360) * tileSize,
      ((screen.y - this.y) / (2 * maxMercatorLatitude)) * tileSize,
    )
  }

  toTile(zoom: number): number[] {
    if (Math.abs(this.y) > maxMercatorLatitude)
      throw Error('latitude out of bounds -90 to 90')
    const n = Math.pow(2, zoom)

    const xNormal = (this.x / 180 + 1) / 2

    const yRadians = (this.y * Math.PI) / 180
    const yMercator =
      Math.log(Math.tan(yRadians) + 1 / Math.cos(yRadians)) / Math.PI
    const yNormal = (1 - yMercator) / 2

    return [n * xNormal, n * yNormal]
  }

  clamp() {
    return new Epsg4326Coordinate(
      Math.max(Math.min(this.x, 180), -180),
      Math.max(
        Math.min(this.y, maxMercatorLatitude),
        -maxMercatorLatitude,
      ),
    )
  }
}

export const maxMercatorLatitude =
  (Math.atan(Math.sinh(Math.PI)) * 180) / Math.PI

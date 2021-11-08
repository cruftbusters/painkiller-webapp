import MapPixel from './MapPixel'
import MapState from './MapState'

export default class Epsg3857Coordinate {
  clamp(): any {
    return new Epsg3857Coordinate(
      Math.max(Math.min(this.x, 180), -180),
      Math.max(
        Math.min(this.y, maxMercatorLatitude),
        -maxMercatorLatitude,
      ),
    )
  }
  toMapPixel({ scale, width, height, left, top }: MapState): any {
    const tileSize = Math.min(width, height) * Math.pow(2, scale)
    return new MapPixel(
      ((this.x - left) / 360) * tileSize,
      ((top - this.y) / (2 * maxMercatorLatitude)) * tileSize,
    )
  }
  toTile(zoom: number): number[] {
    if (Math.abs(this.y) > maxMercatorLatitude)
      throw Error('latitude out of bounds -90 to 90')
    const n = Math.pow(2, zoom)

    const xNormal = (this.x / 180 + 1) / 2
    const yNormal = (1 - this.y / maxMercatorLatitude) / 2

    return [n * xNormal, n * yNormal]
  }
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export const maxMercatorLatitude =
  (Math.atan(Math.sinh(Math.PI)) * 180) / Math.PI

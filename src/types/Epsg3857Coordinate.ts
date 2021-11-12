import MapPixel from './MapPixel'
import MapState from './MapState'

export default class Epsg3857Coordinate {
  clamp(): Epsg3857Coordinate {
    return new Epsg3857Coordinate(
      Math.max(
        Math.min(this.x, maxMercatorLongitude),
        -maxMercatorLongitude,
      ),
      Math.max(
        Math.min(this.y, maxMercatorLatitude),
        -maxMercatorLatitude,
      ),
    )
  }
  toMapPixel({ scale, tileSize, left, top }: MapState): MapPixel {
    const scaledTileSize = tileSize * Math.pow(2, scale)
    return new MapPixel(
      ((this.x - left) / (2 * maxMercatorLongitude)) * scaledTileSize,
      ((top - this.y) / (2 * maxMercatorLatitude)) * scaledTileSize,
    )
  }
  toTile(zoom: number): number[] {
    if (Math.abs(this.y) > maxMercatorLatitude)
      throw Error('latitude out of bounds -90 to 90')
    const n = Math.pow(2, zoom)

    const xNormal = (this.x / maxMercatorLongitude + 1) / 2
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

export const maxMercatorLongitude = 6378137 * Math.PI
export const maxMercatorLatitude = 6378137 * Math.PI

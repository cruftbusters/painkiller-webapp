import Epsg4326Coordinate from './Epsg4326Coordinate'

export default class Tile {
  x: number
  y: number
  z: number
  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }
  toEpsg4326Coordinate(): Epsg4326Coordinate {
    const n = Math.pow(2, this.z)
    return new Epsg4326Coordinate(
      (this.x / n) * 360 - 180,
      (Math.atan(Math.sinh(Math.PI * (1 - (2 * this.y) / n))) * 180) /
        Math.PI,
    )
  }
}

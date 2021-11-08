import Epsg3857Coordinate, {
  maxMercatorLatitude,
} from './Epsg3857Coordinate'

export default class Tile {
  x: number
  y: number
  z: number
  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }
  toEpsg3857Coordinate(): Epsg3857Coordinate {
    const n = Math.pow(2, this.z)
    return new Epsg3857Coordinate(
      (this.x / n) * 360 - 180,
      maxMercatorLatitude - (this.y / n) * maxMercatorLatitude * 2,
    )
  }
  bottomRight(): Tile {
    return new Tile(this.x + 1, this.y + 1, this.z)
  }
  string(): string {
    return `${this.x}-${this.y}-${this.z}`
  }
}

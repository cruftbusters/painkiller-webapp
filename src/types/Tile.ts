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
  toEpsg3857Coordinate(): any {
    const n = Math.pow(2, this.z)
    return new Epsg3857Coordinate(
      (this.x / n) * 360 - 180,
      maxMercatorLatitude - (this.y / n) * maxMercatorLatitude * 2,
    )
  }
}

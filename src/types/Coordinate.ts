import MapState from './MapState'

export default interface Coordinate {
  x: number
  y: number

  toMapPixel(screen: MapState): number[]
  toTile(zoom: number): number[]
}

export class DefaultCoordinate implements Coordinate {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  toMapPixel(screen: MapState): number[] {
    const tileSize =
      Math.min(screen.width, screen.height) * Math.pow(2, screen.scale)
    return [
      ((this.x - screen.x) / 360) * tileSize,
      ((screen.y - this.y) / (2 * maxMercatorLatitude)) * tileSize,
    ]
  }

  toTile(zoom: number): number[] {
    const n = Math.pow(2, zoom)
    const yRadians = (this.y * Math.PI) / 180
    const term = Math.log(Math.tan(yRadians) + 1 / Math.cos(yRadians)) * n
    return [(n * this.x + 180) / 360, (1 - term / Math.PI) / 2]
  }
}

export const maxMercatorLatitude =
  (Math.atan(Math.sinh(Math.PI)) * 180) / Math.PI

export function fromTile(x: number, y: number, z: number): Coordinate {
  const n = Math.pow(2, z)
  return new DefaultCoordinate(
    (x / n) * 360 - 180,
    (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI,
  )
}

export function fromMapPixel(
  screen: MapState,
  x: number,
  y: number,
): Coordinate {
  const tileSize =
    Math.min(screen.width, screen.height) * Math.pow(2, screen.scale)
  return new DefaultCoordinate(
    (x / tileSize) * 360 + screen.x,
    screen.y - (y / tileSize) * 2 * maxMercatorLatitude,
  )
}

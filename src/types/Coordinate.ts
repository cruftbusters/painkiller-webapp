import Screen from './Screen'

export default interface Coordinate {
  x: number
  y: number

  toScreen(screen: Screen): number[]
  toTile(zoom: number): number[]
}

export class DefaultCoordinate implements Coordinate {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  toScreen(screen: Screen): number[] {
    const tileSize = Math.min(screen.width, screen.height)
    const left = (screen.width - tileSize) / 2
    const top = (screen.height - tileSize) / 2
    return [
      left + ((this.x / 180 + 1) / 2) * tileSize,
      top + ((1 - this.y / maxMercatorLatitude) / 2) * tileSize,
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

export function fromScreen(
  screen: Screen,
  x: number,
  y: number,
): Coordinate {
  const tileSize = Math.min(screen.width, screen.height)
  const left = (screen.width - tileSize) / 2
  const top = (screen.height - tileSize) / 2
  return new DefaultCoordinate(
    ((x - left) / tileSize) * 360 - 180,
    (1 - ((y - top) / tileSize) * 2) * maxMercatorLatitude,
  )
}

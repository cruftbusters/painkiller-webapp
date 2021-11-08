import { maxMercatorLatitude } from './Epsg3857Coordinate'

export default class MapState {
  width: number
  height: number
  scale: number
  left: number
  top: number
  constructor({
    width = window.innerWidth,
    height = window.innerHeight,
    scale = 0,
    left = -180,
    top = maxMercatorLatitude,
  }: {
    width?: number
    height?: number
    scale?: number
    left?: number
    top?: number
  }) {
    this.width = width
    this.height = height
    this.scale = scale
    this.left = left
    this.top = top
  }
}

import { maxMercatorLatitude } from './Epsg3857Coordinate'

export default class MapState {
  width: number = window.innerWidth
  height: number = window.innerHeight
  scale: number = 0
  left: number = -180
  top: number = maxMercatorLatitude
  constructor({
    width,
    height,
    scale,
  }: {
    width: number
    height: number
    scale: number
  }) {
    this.width = width
    this.height = height
    this.scale = scale
  }
}

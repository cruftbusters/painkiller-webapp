export default interface MapState {
  width: number
  height: number
  scale: number
}

export class DefaultMapState implements MapState {
  width: number = window.innerWidth
  height: number = window.innerHeight
  scale: number = 0
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

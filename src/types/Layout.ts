export default interface Layout {
  id: string
  size: {
    width: string
    height: string
  }
  bounds: {
    left: number
    top: number
    right: number
    bottom: number
  }
  heightmapURL: string
  hillshadeURL: string
}
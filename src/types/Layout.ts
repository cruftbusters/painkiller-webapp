export default interface Layout {
  id: string
  scale: number
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

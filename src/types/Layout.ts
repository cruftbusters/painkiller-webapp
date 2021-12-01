export default interface Layout {
  id: string
  scale: number
  size: {
    width: number
    height: number
  }
  bounds: {
    left: number
    top: number
    right: number
    bottom: number
  }
  heightmapURL: string
  hiResHeightmapURL: string
  hillshadeURL: string
}

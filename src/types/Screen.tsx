interface Screen {
  tileToScreenPoint(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
}

function NewScreen(width: number, height: number, zoom: number): Screen {
  return {
    tileToScreenPoint: function (this, x, y, z) {
      const tileWidth = Math.min(width, height) * Math.pow(2, zoom - z)
      return [tileWidth * x, tileWidth * y]
    },
  }
}

export default Screen
export { NewScreen }

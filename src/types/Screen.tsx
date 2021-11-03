interface Screen {
  tileToScreenEnvelope(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
}

function NewScreen(width: number, height: number, zoom: number): Screen {
  const baseTileWidth = Math.min(width, height) * Math.pow(2, zoom)
  return {
    tileToScreenEnvelope: function (this, x, y, z) {
      const tileWidth = baseTileWidth / Math.pow(2, z)
      const marginLeft = (width - baseTileWidth) / 2
      const marginTop = (height - baseTileWidth) / 2
      return [
        marginLeft + tileWidth * x,
        marginTop + tileWidth * y,
        marginLeft + tileWidth * (x + 1),
        marginTop + tileWidth * (y + 1),
      ]
    },
  }
}

export default Screen
export { NewScreen }

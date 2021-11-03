interface Screen {
  tileToScreenEnvelope(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
}

function NewScreen(width: number, height: number): Screen {
  return {
    tileToScreenEnvelope: function (this, x, y, z) {
      const tileWidth = Math.min(width, height) / Math.pow(2, z)
      const marginLeft = Math.max(0, (width - height) / 2)
      const marginTop = Math.max(0, (height - width) / 2)
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

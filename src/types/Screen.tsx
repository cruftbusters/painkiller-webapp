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
      const marginLeft = Math.max(0, (width - height) / 2)
      const marginTop = Math.max(0, (height - width) / 2)
      const zpow = Math.pow(2, z)
      const tileWidth = (width - 2 * marginLeft) / zpow
      const tileHeight = (height - 2 * marginTop) / zpow
      return [
        marginLeft,
        marginTop,
        marginLeft + tileWidth,
        marginTop + tileHeight,
      ]
    },
  }
}

export default Screen
export { NewScreen }

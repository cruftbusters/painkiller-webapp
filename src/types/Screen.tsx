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
      const marginWidth = Math.max(0, (width - height) / 2)
      const marginHeight = Math.max(0, (height - width) / 2)
      return [
        marginWidth,
        marginHeight,
        width - marginWidth,
        height - marginHeight,
      ]
    },
  }
}

export default Screen
export { NewScreen }

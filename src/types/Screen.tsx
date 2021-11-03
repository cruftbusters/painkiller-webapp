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
      const marginWidth = (width - height) / 2
      const marginHeight = (height - width) / 2
      if (marginWidth > marginHeight) {
        return [marginWidth, 0, width - marginWidth, height]
      } else {
        return [0, marginHeight, width, height - marginHeight]
      }
    },
  }
}

export default Screen
export { NewScreen }

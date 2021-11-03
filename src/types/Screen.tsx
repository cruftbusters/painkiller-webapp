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
      const left = width / 2
      const top = height / 2
      return [left - 128, top - 128, left + 128, top + 128]
    },
  }
}

export default Screen
export { NewScreen }

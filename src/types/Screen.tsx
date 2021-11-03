interface Screen {
  tileToScreenEnvelope(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
}

function NewScreen(): Screen {
  return {
    tileToScreenEnvelope: function (this, x, y, z) {
      return [20, 20, 256, 256]
    },
  }
}

export default Screen
export { NewScreen }

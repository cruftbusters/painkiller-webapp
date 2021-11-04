interface Screen {
  tileToScreenEnvelope(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
  tileToScreenPoint(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
}

function NewScreen(width: number, height: number, zoom: number): Screen {
  const fitWidth = Math.min(width, height)
  const zpow = Math.pow(2, zoom)
  const xCenter = (width - fitWidth * zpow) / 2
  const yCenter = (height - fitWidth * zpow) / 2
  return {
    tileToScreenEnvelope: function (this, x, y, z) {
      const [left, top] = this.tileToScreenPoint(x, y, z)
      const [right, bottom] = this.tileToScreenPoint(x + 1, y + 1, z)
      return [left, top, right, bottom]
    },
    tileToScreenPoint: function (this, x, y, z) {
      const dzpow = Math.pow(2, zoom - z)
      return [
        xCenter + fitWidth * dzpow * x,
        yCenter + fitWidth * dzpow * y,
      ]
    },
  }
}

export default Screen
export { NewScreen }

interface Screen {
  tileToScreenEnvelope(
    this: Screen,
    x: number,
    y: number,
    z: number,
  ): number[]
}

function NewScreen(width: number, height: number, zoom: number): Screen {
  return {
    tileToScreenEnvelope: function (this, x, y, z) {
      const fitWidth = Math.min(width, height)
      const zpow = Math.pow(2, zoom)
      const dzpow = Math.pow(2, zoom - z)
      return [
        (width - fitWidth * zpow) / 2 + fitWidth * dzpow * x,
        (height - fitWidth * zpow) / 2 + fitWidth * dzpow * y,
        (width - fitWidth * zpow) / 2 + fitWidth * dzpow * (x + 1),
        (height - fitWidth * zpow) / 2 + fitWidth * dzpow * (y + 1),
      ]
    },
  }
}

export default Screen
export { NewScreen }

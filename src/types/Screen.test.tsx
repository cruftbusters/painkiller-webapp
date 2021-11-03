import { NewScreen } from './Screen'

describe('tile to screen envelope', () => {
  it('fits tile to wide screen', () => {
    expect(
      NewScreen(1024, 512, 0).tileToScreenEnvelope(0, 0, 0),
    ).toStrictEqual([256, 0, 768, 512])
  })

  it('fits tile to tall screen', () => {
    expect(
      NewScreen(512, 1024, 0).tileToScreenEnvelope(0, 0, 0),
    ).toStrictEqual([0, 256, 512, 768])
  })

  it('fits zoomed tile to quarter of normal tile', () => {
    expect(NewScreen(4, 2, 0).tileToScreenEnvelope(0, 0, 1)).toStrictEqual(
      [1, 0, 2, 1],
    )
  })

  it('fits zoomed tile to quarter of normal tile with offset', () => {
    expect(NewScreen(4, 2, 0).tileToScreenEnvelope(1, 1, 1)).toStrictEqual(
      [2, 1, 3, 2],
    )
  })

  it('fits zoomed tile to zoomed normal tile', () => {
    expect(NewScreen(2, 2, 1).tileToScreenEnvelope(0, 0, 1)).toStrictEqual(
      [-1, -1, 1, 1],
    )
  })
})

import { NewScreen } from './Screen'

test('every tile is center of screen', () => {
  expect(NewScreen(1024, 512).tileToScreenEnvelope(0, 0, 0)).toStrictEqual(
    [512 - 128, 256 - 128, 512 + 128, 256 + 128],
  )
})

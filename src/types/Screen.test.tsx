import { NewScreen } from './Screen'

test('stretch z=0 tile to fit wide screen', () => {
  expect(NewScreen(1024, 512).tileToScreenEnvelope(0, 0, 0)).toStrictEqual(
    [256, 0, 768, 512],
  )
})

test('stretch z=0 tile to fit tall screen', () => {
  expect(NewScreen(512, 1024).tileToScreenEnvelope(0, 0, 0)).toStrictEqual(
    [0, 256, 512, 768],
  )
})

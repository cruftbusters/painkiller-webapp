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

test('stretch z=1 tile to fit quarter of z=0', () => {
  expect(NewScreen(4, 2).tileToScreenEnvelope(0, 0, 1)).toStrictEqual([
    1, 0, 2, 1,
  ])
})

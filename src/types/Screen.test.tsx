import { NewScreen } from './Screen'

test('stretch z=0 tile to fit wide screen', () => {
  expect(
    NewScreen(1024, 512, 0).tileToScreenEnvelope(0, 0, 0),
  ).toStrictEqual([256, 0, 768, 512])
})

test('stretch z=0 tile to fit tall screen', () => {
  expect(
    NewScreen(512, 1024, 0).tileToScreenEnvelope(0, 0, 0),
  ).toStrictEqual([0, 256, 512, 768])
})

test('stretch z=1 tile to fit quarter of z=0', () => {
  expect(NewScreen(4, 2, 0).tileToScreenEnvelope(0, 0, 1)).toStrictEqual([
    1, 0, 2, 1,
  ])
})

test('offset z=1 tile to fit right quarter of z=0', () => {
  expect(NewScreen(4, 2, 0).tileToScreenEnvelope(1, 1, 1)).toStrictEqual([
    2, 1, 3, 2,
  ])
})

test('fit z=1 tile to screen', () => {
  expect(NewScreen(2, 2, 1).tileToScreenEnvelope(0, 0, 1)).toStrictEqual([
    -1, -1, 1, 1,
  ])
})

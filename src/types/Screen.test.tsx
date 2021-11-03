import { NewScreen } from './Screen'

test('same envelope every time', () => {
  expect(NewScreen().tileToScreenEnvelope(0, 0, 0)).toStrictEqual([
    20, 20, 256, 256,
  ])
})

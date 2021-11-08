import MapState from './MapState'

describe('map state', () => {
  describe('pan', () => {
    it('pans at scale 0 with tiny square screen', () => {
      expect(
        new MapState({ width: 1, height: 1, scale: 0, left: 0, top: 0 }).pan(
          1,
          1,
        ),
      ).toStrictEqual(
        new MapState({ width: 1, height: 1, scale: 0, left: -360, top: 180 }),
      )
    })
    it('pans at scale 0 with wide screen', () => {
      expect(
        new MapState({ width: 2, height: 1, scale: 0, left: 0, top: 0 }).pan(
          1,
          1,
        ),
      ).toStrictEqual(
        new MapState({ width: 2, height: 1, scale: 0, left: -360, top: 180 }),
      )
    })
    it('pans at scale 0 with tall screen', () => {
      expect(
        new MapState({ width: 1, height: 2, scale: 0, left: 0, top: 0 }).pan(
          1,
          1,
        ),
      ).toStrictEqual(
        new MapState({ width: 1, height: 2, scale: 0, left: -360, top: 180 }),
      )
    })
    it('pans at scale 1 with tiny square screen', () => {
      expect(
        new MapState({ width: 1, height: 1, scale: 1, left: 0, top: 0 }).pan(
          1,
          1,
        ),
      ).toStrictEqual(
        new MapState({ width: 1, height: 1, scale: 1, left: -180, top: 90 }),
      )
    })
  })
})

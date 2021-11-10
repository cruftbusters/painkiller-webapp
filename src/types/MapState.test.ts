import MapState from './MapState'

describe('map state', () => {
  describe('pan', () => {
    it('pans at scale 0 with tiny square screen', () => {
      expect(
        new MapState({
          width: 256,
          height: 256,
          scale: 0,
          left: 0,
          top: 0,
        }).pan(256, 256),
      ).toStrictEqual(
        new MapState({
          width: 256,
          height: 256,
          scale: 0,
          left: -360,
          top: 180,
        }),
      )
    })
    it('pans at scale 0 with wide screen', () => {
      expect(
        new MapState({
          width: 512,
          height: 256,
          scale: 0,
          left: 0,
          top: 0,
        }).pan(256, 256),
      ).toStrictEqual(
        new MapState({
          width: 512,
          height: 256,
          scale: 0,
          left: -360,
          top: 180,
        }),
      )
    })
    it('pans at scale 0 with tall screen', () => {
      expect(
        new MapState({
          width: 256,
          height: 512,
          scale: 0,
          left: 0,
          top: 0,
        }).pan(256, 256),
      ).toStrictEqual(
        new MapState({
          width: 256,
          height: 512,
          scale: 0,
          left: -360,
          top: 180,
        }),
      )
    })
    it('pans at scale 1 with tiny square screen', () => {
      expect(
        new MapState({
          width: 256,
          height: 256,
          scale: 1,
          left: 0,
          top: 0,
        }).pan(256, 256),
      ).toStrictEqual(
        new MapState({
          width: 256,
          height: 256,
          scale: 1,
          left: -180,
          top: 90,
        }),
      )
    })
  })
  describe('zoom', () => {
    it('zoom impacts scale linearly', () => {
      expect(
        new MapState({ width: 256, height: 256 }).zoom(-114),
      ).toStrictEqual(
        new MapState({ width: 256, height: 256, scale: 0.125 }),
      )

      expect(
        new MapState({ width: 256, height: 256, scale: 1 }).zoom(-114),
      ).toStrictEqual(
        new MapState({ width: 256, height: 256, scale: 1.125 }),
      )
    })
  })
})

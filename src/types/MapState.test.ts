import {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from './Epsg3857Coordinate'
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
          left: -2 * maxMercatorLongitude,
          top: 2 * maxMercatorLatitude,
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
          left: -2 * maxMercatorLongitude,
          top: 2 * maxMercatorLatitude,
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
          left: -2 * maxMercatorLongitude,
          top: 2 * maxMercatorLatitude,
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
          left: -maxMercatorLongitude,
          top: maxMercatorLatitude,
        }),
      )
    })
  })
  describe('zoom', () => {
    it('zoom impacts scale linearly', () => {
      expect(
        new MapState({ width: 256, height: 256 }).zoom(-114, 0, 0).scale,
      ).toStrictEqual(0.125)

      expect(
        new MapState({ width: 256, height: 256, scale: 1 }).zoom(
          -114,
          0,
          0,
        ).scale,
      ).toStrictEqual(1.125)
    })
    it('zooms to center', () => {
      expect(
        new MapState({ width: 256, height: 256 }).zoom(-114 * 8, 128, 128),
      ).toStrictEqual(
        new MapState({
          width: 256,
          height: 256,
          scale: 1,
          left: -maxMercatorLongitude / 2,
          top: maxMercatorLatitude / 2,
        }),
      )
    })
    it('zooms to bottom right', () => {
      expect(
        new MapState({ width: 256, height: 256 }).zoom(-114 * 8, 256, 256),
      ).toStrictEqual(
        new MapState({
          width: 256,
          height: 256,
          scale: 1,
          left: 0,
          top: 0,
        }),
      )
    })
  })
})

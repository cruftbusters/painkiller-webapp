import Epsg3857Coordinate, {
  maxMercatorLatitude,
} from './Epsg3857Coordinate'
import MapState from './MapState'
import MapPixel from './MapPixel'

describe('map pixel', () => {
  describe('to epsg 3857 coordinate', () => {
    it('translates top left', () => {
      expect(
        new MapPixel(0, 0).toEpsg3857Coordinate(
          new MapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(-180, maxMercatorLatitude))
    })

    it('translates bottom right', () => {
      expect(
        new MapPixel(256, 256).toEpsg3857Coordinate(
          new MapState({ width: 256, height: 256, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(180, -maxMercatorLatitude))
    })

    it('translates center', () => {
      expect(
        new MapPixel(128, 128).toEpsg3857Coordinate(
          new MapState({ width: 256, height: 256, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(0, 0))
    })

    it('preserve mercator square', () => {
      expect(
        new MapPixel(0, 0).toEpsg3857Coordinate(
          new MapState({ width: 2, height: 4, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(-180, maxMercatorLatitude))

      expect(
        new MapPixel(0, 0).toEpsg3857Coordinate(
          new MapState({ width: 4, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(-180, maxMercatorLatitude))
    })

    it('scale', () => {
      expect(
        new MapPixel(512, 512).toEpsg3857Coordinate(
          new MapState({ width: 256, height: 256, scale: 1 }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(180, -maxMercatorLatitude))
    })

    it('offset', () => {
      expect(
        new MapPixel(128, 128).toEpsg3857Coordinate(
          new MapState({
            width: 256,
            height: 256,
            scale: 0,
            left: 0,
            top: 0,
          }),
        ),
      ).toStrictEqual(new Epsg3857Coordinate(180, -maxMercatorLatitude))
    })
  })
})

import Epsg4326Coordinate, {
  fromMapPixel,
  maxMercatorLatitude,
} from './Epsg4326Coordinate'
import { DefaultMapState } from './MapState'
import MapPixel from './MapPixel'

describe('map pixel', () => {
  describe('to epsg 4326 coordinate', () => {
    it('translates top left', () => {
      expect(
        new MapPixel(0, 0).toEpsg4326Coordinate(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg4326Coordinate(-180, maxMercatorLatitude))
    })

    it('translates bottom right', () => {
      expect(
        new MapPixel(2, 2).toEpsg4326Coordinate(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg4326Coordinate(180, -maxMercatorLatitude))
    })

    it('translates center', () => {
      expect(
        new MapPixel(1, 1).toEpsg4326Coordinate(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg4326Coordinate(0, 0))
    })

    it('preserve mercator square', () => {
      expect(
        new MapPixel(0, 0).toEpsg4326Coordinate(
          new DefaultMapState({ width: 2, height: 4, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg4326Coordinate(-180, maxMercatorLatitude))

      expect(
        new MapPixel(0, 0).toEpsg4326Coordinate(
          new DefaultMapState({ width: 4, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new Epsg4326Coordinate(-180, maxMercatorLatitude))
    })

    it('scale', () => {
      expect(
        new MapPixel(4, 4).toEpsg4326Coordinate(
          new DefaultMapState({ width: 2, height: 2, scale: 1 }),
        ),
      ).toStrictEqual(new Epsg4326Coordinate(180, -maxMercatorLatitude))
    })

    it('offset', () => {
      expect(
        new MapPixel(1, 1).toEpsg4326Coordinate({
          width: 2,
          height: 2,
          scale: 0,
          x: 0,
          y: 0,
        }),
      ).toStrictEqual(new Epsg4326Coordinate(180, -maxMercatorLatitude))
    })
  })
})

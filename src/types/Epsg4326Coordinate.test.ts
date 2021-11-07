import Epsg4326Coordinate, {
  fromMapPixel,
  maxMercatorLatitude,
} from './Epsg4326Coordinate'
import { DefaultMapState } from './MapState'

describe('epsg 4326 coordinate', () => {
  describe('to map pixel', () => {
    it('translates top left', () => {
      expect(
        new Epsg4326Coordinate(-180, maxMercatorLatitude).toMapPixel(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual([0, 0])
    })

    it('translates bottom right', () => {
      expect(
        new Epsg4326Coordinate(180, -maxMercatorLatitude).toMapPixel(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual([2, 2])
    })

    it('preserve mercator square', () => {
      expect(
        new Epsg4326Coordinate(-180, maxMercatorLatitude).toMapPixel(
          new DefaultMapState({
            width: 4,
            height: 2,
            scale: 0,
          }),
        ),
      ).toStrictEqual([0, 0])

      expect(
        new Epsg4326Coordinate(-180, maxMercatorLatitude).toMapPixel(
          new DefaultMapState({
            width: 2,
            height: 4,
            scale: 0,
          }),
        ),
      ).toStrictEqual([0, 0])
    })

    it('scale', () => {
      expect(
        new Epsg4326Coordinate(180, -maxMercatorLatitude).toMapPixel(
          new DefaultMapState({
            width: 2,
            height: 2,
            scale: 1,
          }),
        ),
      ).toStrictEqual([4, 4])
    })

    it('offset', () => {
      expect(
        new Epsg4326Coordinate(180, -maxMercatorLatitude).toMapPixel({
          width: 2,
          height: 2,
          scale: 0,
          x: 0,
          y: 0,
        }),
      ).toStrictEqual([1, 1])
    })
  })

  describe('from map pixel', () => {
    it('translates top left', () => {
      expect(
        fromMapPixel(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
          0,
          0,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(-180, maxMercatorLatitude))
    })

    it('translates bottom right', () => {
      expect(
        fromMapPixel(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
          2,
          2,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(180, -maxMercatorLatitude))
    })

    it('translates center', () => {
      expect(
        fromMapPixel(
          new DefaultMapState({ width: 2, height: 2, scale: 0 }),
          1,
          1,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(0, 0))
    })

    it('preserve mercator square', () => {
      expect(
        fromMapPixel(
          new DefaultMapState({ width: 2, height: 4, scale: 0 }),
          0,
          0,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(-180, maxMercatorLatitude))

      expect(
        fromMapPixel(
          new DefaultMapState({ width: 4, height: 2, scale: 0 }),
          0,
          0,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(-180, maxMercatorLatitude))
    })

    it('scale', () => {
      expect(
        fromMapPixel(
          new DefaultMapState({ width: 2, height: 2, scale: 1 }),
          4,
          4,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(180, -maxMercatorLatitude))
    })

    it('offset', () => {
      expect(
        fromMapPixel(
          {
            width: 2,
            height: 2,
            scale: 0,
            x: 0,
            y: 0,
          },
          1,
          1,
        ),
      ).toStrictEqual(new Epsg4326Coordinate(180, -maxMercatorLatitude))
    })
  })

  describe('to tile', () => {
    function snap(detail: number, numbers: number[]) {
      return numbers.map((n) => Math.round(n * detail) / detail)
    }

    it('translates top left', () => {
      const topLeft = new Epsg4326Coordinate(-180, maxMercatorLatitude)
      expect(snap(64, topLeft.toTile(0))).toStrictEqual([0, 0])
      expect(snap(64, topLeft.toTile(1))).toStrictEqual([0, 0])
    })

    it('translates bottom right', () => {
      expect(
        snap(
          64,
          new Epsg4326Coordinate(180, -maxMercatorLatitude).toTile(0),
        ),
      ).toStrictEqual([1, 1])
    })

    it('translates origin', () => {
      expect(new Epsg4326Coordinate(0, 0).toTile(0)).toStrictEqual([
        1 / 2,
        1 / 2,
      ])
    })

    it('latitude is out of bounds', () => {
      expect(() =>
        new Epsg4326Coordinate(-180, -maxMercatorLatitude - 1).toTile(1),
      ).toThrow('latitude out of bounds -90 to 90')
    })
  })

  describe('clamp', () => {
    it('clamps left edge', () => {
      expect(new Epsg4326Coordinate(-181, 0).clamp()).toStrictEqual(
        new Epsg4326Coordinate(-180, 0),
      )
    })
    it('clamps top edge', () => {
      expect(
        new Epsg4326Coordinate(0, -maxMercatorLatitude - 1).clamp(),
      ).toStrictEqual(new Epsg4326Coordinate(0, -maxMercatorLatitude))
    })
    it('clamps right edge', () => {
      expect(new Epsg4326Coordinate(181, 0).clamp()).toStrictEqual(
        new Epsg4326Coordinate(180, 0),
      )
    })
    it('clamps bottom edge', () => {
      expect(
        new Epsg4326Coordinate(0, maxMercatorLatitude + 1).clamp(),
      ).toStrictEqual(new Epsg4326Coordinate(0, maxMercatorLatitude))
    })
  })
})

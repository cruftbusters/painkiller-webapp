import Epsg3857Coordinate, {
  maxMercatorLatitude,
} from './Epsg3857Coordinate'
import MapState from './MapState'
import MapPixel from './MapPixel'

describe('epsg 3857 coordinate', () => {
  describe('to map pixel', () => {
    it('translates top left', () => {
      expect(
        new Epsg3857Coordinate(-180, maxMercatorLatitude).toMapPixel(
          new MapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new MapPixel(0, 0))
    })

    it('translates bottom right', () => {
      expect(
        new Epsg3857Coordinate(180, -maxMercatorLatitude).toMapPixel(
          new MapState({ width: 2, height: 2, scale: 0 }),
        ),
      ).toStrictEqual(new MapPixel(2, 2))
    })

    it('preserve mercator square', () => {
      expect(
        new Epsg3857Coordinate(-180, maxMercatorLatitude).toMapPixel(
          new MapState({
            width: 4,
            height: 2,
            scale: 0,
          }),
        ),
      ).toStrictEqual(new MapPixel(0, 0))

      expect(
        new Epsg3857Coordinate(-180, maxMercatorLatitude).toMapPixel(
          new MapState({
            width: 2,
            height: 4,
            scale: 0,
          }),
        ),
      ).toStrictEqual(new MapPixel(0, 0))
    })

    it('scale', () => {
      expect(
        new Epsg3857Coordinate(180, -maxMercatorLatitude).toMapPixel(
          new MapState({
            width: 2,
            height: 2,
            scale: 1,
          }),
        ),
      ).toStrictEqual(new MapPixel(4, 4))
    })

    it('offset', () => {
      expect(
        new Epsg3857Coordinate(180, -maxMercatorLatitude).toMapPixel({
          width: 2,
          height: 2,
          scale: 0,
          left: 0,
          top: 0,
        }),
      ).toStrictEqual(new MapPixel(1, 1))
    })
  })

  describe('to tile', () => {
    function snap(detail: number, numbers: number[]) {
      return numbers.map((n) => Math.round(n * detail) / detail)
    }

    it('translates top left', () => {
      const topLeft = new Epsg3857Coordinate(-180, maxMercatorLatitude)
      expect(snap(64, topLeft.toTile(0))).toStrictEqual([0, 0])
      expect(snap(64, topLeft.toTile(1))).toStrictEqual([0, 0])
    })

    it('translates bottom right', () => {
      expect(
        snap(
          64,
          new Epsg3857Coordinate(180, -maxMercatorLatitude).toTile(0),
        ),
      ).toStrictEqual([1, 1])
    })

    it('translates origin', () => {
      expect(new Epsg3857Coordinate(0, 0).toTile(0)).toStrictEqual([
        1 / 2,
        1 / 2,
      ])
    })

    it('latitude is out of bounds', () => {
      expect(() =>
        new Epsg3857Coordinate(-180, -maxMercatorLatitude - 1).toTile(1),
      ).toThrow('latitude out of bounds -90 to 90')
    })
  })

  describe('clamp', () => {
    it('clamps left edge', () => {
      expect(new Epsg3857Coordinate(-181, 0).clamp()).toStrictEqual(
        new Epsg3857Coordinate(-180, 0),
      )
    })
    it('clamps top edge', () => {
      expect(
        new Epsg3857Coordinate(0, -maxMercatorLatitude - 1).clamp(),
      ).toStrictEqual(new Epsg3857Coordinate(0, -maxMercatorLatitude))
    })
    it('clamps right edge', () => {
      expect(new Epsg3857Coordinate(181, 0).clamp()).toStrictEqual(
        new Epsg3857Coordinate(180, 0),
      )
    })
    it('clamps bottom edge', () => {
      expect(
        new Epsg3857Coordinate(0, maxMercatorLatitude + 1).clamp(),
      ).toStrictEqual(new Epsg3857Coordinate(0, maxMercatorLatitude))
    })
  })
})

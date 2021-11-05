import {
  DefaultCoordinate,
  fromScreen,
  fromTile,
  maxMercatorLatitude,
} from './Coordinate'

describe('coordinate', () => {
  describe('from tile', () => {
    it('translates top left', () => {
      expect(fromTile(0, 0, 0)).toStrictEqual(
        new DefaultCoordinate(-180, maxMercatorLatitude),
      )
    })

    it('translates bottom right', () => {
      expect(fromTile(1, 1, 0)).toStrictEqual(
        new DefaultCoordinate(180, -maxMercatorLatitude),
      )
    })

    it('translates origin ', () => {
      expect(fromTile(1, 1, 1)).toStrictEqual(new DefaultCoordinate(0, 0))
      expect(fromTile(2, 2, 2)).toStrictEqual(new DefaultCoordinate(0, 0))
      expect(fromTile(4, 4, 3)).toStrictEqual(new DefaultCoordinate(0, 0))
      expect(fromTile(8, 8, 4)).toStrictEqual(new DefaultCoordinate(0, 0))
    })
  })

  describe('to screen', () => {
    it('translates top left', () => {
      const screen = { width: 2, height: 2, scale: 0 }
      expect(
        new DefaultCoordinate(-180, maxMercatorLatitude).toScreen(screen),
      ).toStrictEqual([0, 0])
    })

    it('translates bottom right', () => {
      const screen = { width: 2, height: 2, scale: 0 }
      expect(
        new DefaultCoordinate(180, -maxMercatorLatitude).toScreen(screen),
      ).toStrictEqual([2, 2])
    })

    it('preserve mercator square', () => {
      expect(
        new DefaultCoordinate(-180, maxMercatorLatitude).toScreen({
          width: 4,
          height: 2,
          scale: 0,
        }),
      ).toStrictEqual([0, 0])

      expect(
        new DefaultCoordinate(-180, maxMercatorLatitude).toScreen({
          width: 2,
          height: 4,
          scale: 0,
        }),
      ).toStrictEqual([0, 0])
    })
  })

  describe('from screen', () => {
    it('translates top left', () => {
      expect(
        fromScreen({ width: 2, height: 2, scale: 0 }, 0, 0),
      ).toStrictEqual(new DefaultCoordinate(-180, maxMercatorLatitude))
    })

    it('translates bottom right', () => {
      expect(
        fromScreen({ width: 2, height: 2, scale: 0 }, 2, 2),
      ).toStrictEqual(new DefaultCoordinate(180, -maxMercatorLatitude))
    })

    it('translates center', () => {
      expect(
        fromScreen({ width: 2, height: 2, scale: 0 }, 1, 1),
      ).toStrictEqual(new DefaultCoordinate(0, 0))
    })

    it('preserve mercator square', () => {
      expect(
        fromScreen({ width: 2, height: 4, scale: 0 }, 0, 0),
      ).toStrictEqual(new DefaultCoordinate(-180, maxMercatorLatitude))

      expect(
        fromScreen({ width: 4, height: 2, scale: 0 }, 0, 0),
      ).toStrictEqual(new DefaultCoordinate(-180, maxMercatorLatitude))
    })
  })

  describe('to tile', () => {
    function snap(detail: number, numbers: number[]) {
      return numbers.map((n) => Math.round(n * detail) / detail)
    }

    it('translates top left', () => {
      expect(
        snap(
          64,
          new DefaultCoordinate(-180, maxMercatorLatitude).toTile(0),
        ),
      ).toStrictEqual([0, 0])
    })

    it('translates bottom right', () => {
      expect(
        snap(
          64,
          new DefaultCoordinate(180, -maxMercatorLatitude).toTile(0),
        ),
      ).toStrictEqual([1, 1])
    })

    it('translates origin', () => {
      expect(new DefaultCoordinate(0, 0).toTile(0)).toStrictEqual([
        1 / 2,
        1 / 2,
      ])
    })
  })
})

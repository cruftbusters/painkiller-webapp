import Epsg3857Coordinate, {
  maxMercatorLatitude,
  maxMercatorLongitude,
} from './Epsg3857Coordinate'
import Tile from './Tile'

describe('tile', () => {
  describe('to epsg 3857 coordinate', () => {
    it('translates top left', () => {
      expect(new Tile(0, 0, 0).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(-maxMercatorLongitude, maxMercatorLatitude),
      )
    })

    it('translates bottom right', () => {
      expect(new Tile(1, 1, 0).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(maxMercatorLongitude, -maxMercatorLatitude),
      )
    })

    it('translates origin', () => {
      expect(new Tile(1, 1, 1).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(0, 0),
      )
      expect(new Tile(2, 2, 2).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(0, 0),
      )
      expect(new Tile(4, 4, 3).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(0, 0),
      )
      expect(new Tile(8, 8, 4).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(0, 0),
      )
    })

    it('translates midpoint between top left and origin', () => {
      expect(new Tile(1, 1, 2).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(
          -maxMercatorLongitude / 2,
          maxMercatorLatitude / 2,
        ),
      )
    })
  })

  describe('bottom right', () => {
    it('returns tile to the bottom right', () => {
      expect(new Tile(0, 0, 0).bottomRight()).toStrictEqual(
        new Tile(1, 1, 0),
      )
    })
  })

  describe('string', () => {
    it('returns x y z as string', () => {
      expect(new Tile(1, 2, 3).string()).toBe('1-2-3')
    })
  })
})

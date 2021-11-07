import Epsg3857Coordinate, {
  maxMercatorLatitude,
} from './Epsg3857Coordinate'
import Tile from './Tile'

describe('tile', () => {
  describe('to epsg 3857 coordinate', () => {
    it('translates top left', () => {
      expect(new Tile(0, 0, 0).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(-180, maxMercatorLatitude),
      )
    })

    it('translates bottom right', () => {
      expect(new Tile(1, 1, 0).toEpsg3857Coordinate()).toStrictEqual(
        new Epsg3857Coordinate(180, -maxMercatorLatitude),
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
        new Epsg3857Coordinate(-180 / 2, maxMercatorLatitude / 2),
      )
    })
  })
})

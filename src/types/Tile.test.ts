import Epsg4326Coordinate, {
  maxMercatorLatitude,
} from './Epsg4326Coordinate'
import Tile from './Tile'

describe('tile', () => {
  describe('to epsg 4326 coordinate', () => {
    it('translates top left', () => {
      expect(new Tile(0, 0, 0).toEpsg4326Coordinate()).toStrictEqual(
        new Epsg4326Coordinate(-180, maxMercatorLatitude),
      )
    })

    it('translates bottom right', () => {
      expect(new Tile(1, 1, 0).toEpsg4326Coordinate()).toStrictEqual(
        new Epsg4326Coordinate(180, -maxMercatorLatitude),
      )
    })

    it('translates origin ', () => {
      expect(new Tile(1, 1, 1).toEpsg4326Coordinate()).toStrictEqual(
        new Epsg4326Coordinate(0, 0),
      )
      expect(new Tile(2, 2, 2).toEpsg4326Coordinate()).toStrictEqual(
        new Epsg4326Coordinate(0, 0),
      )
      expect(new Tile(4, 4, 3).toEpsg4326Coordinate()).toStrictEqual(
        new Epsg4326Coordinate(0, 0),
      )
      expect(new Tile(8, 8, 4).toEpsg4326Coordinate()).toStrictEqual(
        new Epsg4326Coordinate(0, 0),
      )
    })
  })
})

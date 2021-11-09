import MapPixel from '../types/MapPixel'
import MapState from '../types/MapState'
import Tile from '../types/Tile'
import BaseLayerTile from './BaseLayerTile'

interface BaseLayerProps {
  mapState: MapState
}

export default function BaseLayer({ mapState }: BaseLayerProps) {
  const z = Math.floor(mapState.scale)
  const [left, top] = new MapPixel(0, 0)
    .toEpsg3857Coordinate(mapState)
    .clamp()
    .toTile(z)
  const [right, bottom] = new MapPixel(mapState.width, mapState.height)
    .toEpsg3857Coordinate(mapState)
    .clamp()
    .toTile(z)
  const tiles = []
  for (let x = Math.floor(left); x < right; x++) {
    for (let y = Math.floor(top); y < bottom; y++) {
      tiles.push(new Tile(x, y, z))
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {tiles.map((tile) => {
        const { x: left, y: top } = tile
          .toEpsg3857Coordinate()
          .toMapPixel(mapState)
        const { x: right, y: bottom } = tile
          .bottomRight()
          .toEpsg3857Coordinate()
          .toMapPixel(mapState)
        return (
          <BaseLayerTile
            key={tile.string()}
            tile={tile}
            envelope={{ left, top, right, bottom }}
          />
        )
      })}
    </div>
  )
}

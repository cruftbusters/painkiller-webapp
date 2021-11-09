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

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {grid(
        Math.floor(left),
        Math.floor(top),
        Math.ceil(right),
        Math.ceil(bottom),
      )
        .map(([x, y]) => new Tile(x, y, z))
        .map((tile) => {
          const { x: left, y: top } = tile
            .toEpsg3857Coordinate()
            .toMapPixel(mapState)
          const { x: right, y: bottom } = tile
            .bottomRight()
            .toEpsg3857Coordinate()
            .toMapPixel(mapState)
          const width = Math.round(right - left)
          const height = Math.round(bottom - top)
          return (
            <BaseLayerTile
              key={tile.string()}
              tile={tile}
              position={{ left, top }}
              size={{ width, height }}
            />
          )
        })}
    </div>
  )
}

function grid(
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
): number[][] {
  return Array.apply(null, Array(Math.ceil(xEnd) - Math.floor(xStart)))
    .map((_, dx) =>
      Array.apply(null, Array(Math.ceil(yEnd) - Math.floor(yStart))).map(
        (_, dy) => [xStart + dx, yStart + dy],
      ),
    )
    .flat()
}

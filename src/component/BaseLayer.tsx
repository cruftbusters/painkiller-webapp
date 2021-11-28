import useMapState from '../hook/useMapState'
import MapPixel from '../types/MapPixel'
import Tile from '../types/Tile'
import BaseLayerTile from './BaseLayerTile'

export default function BaseLayer() {
  const { mapState } = useMapState()

  const z = Math.floor(mapState.scale)
  const [left, top] = new MapPixel(0, 0)
    .toEpsg3857Coordinate(mapState)
    .clamp()
    .toTile(z)
  const [right, bottom] = new MapPixel(mapState.width, mapState.height)
    .toEpsg3857Coordinate(mapState)
    .clamp()
    .toTile(z)

  const width = Math.floor(mapState.width / (right - left))
  const origin = new Tile(Math.floor(left), Math.floor(top), z)
  const offset = origin.toEpsg3857Coordinate().toMapPixel(mapState)

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
        .map((tile) => (
          <BaseLayerTile
            key={tile.string()}
            tile={tile}
            style={{
              position: 'absolute',
              width: px(width),
              height: px(width),
              left: px(offset.x + (tile.x - origin.x) * width),
              top: px(offset.y + (tile.y - origin.y) * width),
            }}
          />
        ))}
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

function px(n: number) {
  return `${n}px`
}

import { useEffect, useState } from 'react'
import Epsg3857Coordinate from '../types/Epsg3857Coordinate'
import MapState from '../types/MapState'
import Layout from '../types/Layout'

interface HeightmapProps {
  layout?: Layout
  mapState: MapState
}

export default function Heightmap({ layout, mapState }: HeightmapProps) {
  const [mapBounds, setMapBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (!layout) return
    const { left, top, right, bottom } = layout.bounds
    setMapBounds(
      worldBoundsToMapBounds(
        new Epsg3857Coordinate(left, top),
        new Epsg3857Coordinate(right, bottom),
        mapState,
      ),
    )
  }, [mapState, layout])

  return (
    <div
      style={{
        display: layout?.heightmapURL ? 'block' : 'none',
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.5,
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <img
        style={{
          display: 'block',
          position: 'relative',
          ...mapBounds,
        }}
        alt=""
        src={layout?.heightmapURL}
      />
    </div>
  )
}

function worldBoundsToMapBounds(
  topLeft: Epsg3857Coordinate,
  bottomRight: Epsg3857Coordinate,
  mapState: MapState,
): { left: number; top: number; width: number; height: number } {
  const { x: left, y: top } = topLeft.toMapPixel(mapState)
  const { x: right, y: bottom } = bottomRight.toMapPixel(mapState)
  return { left, top, width: right - left, height: bottom - top }
}

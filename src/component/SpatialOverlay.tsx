import { useEffect, useState } from 'react'
import Epsg3857Coordinate from '../types/Epsg3857Coordinate'
import MapState from '../types/MapState'
import Layout from '../types/Layout'
import useMapState from '../hook/useMapState'

interface SpatialOverlayProps {
  layout?: Layout
  url: string | undefined
  overlayOpacity: string
}

export default function SpatialOverlay({
  layout,
  url,
  overlayOpacity,
}: SpatialOverlayProps) {
  const { mapState } = useMapState()

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
        display: url ? 'block' : 'none',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        overflow: 'hidden',
        opacity: overlayOpacity,
      }}
    >
      <img
        style={{
          display: 'block',
          position: 'relative',
          ...mapBounds,
        }}
        alt=""
        src={url}
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

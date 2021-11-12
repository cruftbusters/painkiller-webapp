import { useEffect, useRef, useState } from 'react'
import Epsg3857Coordinate from '../types/Epsg3857Coordinate'
import MapState from '../types/MapState'
import Metadata from '../types/Metadata'

interface HeightmapProps {
  id?: string
  mapState: MapState
}

export default function Heightmap({ id, mapState }: HeightmapProps) {
  const [heightmap, setHeightmap] = useState<Metadata>()
  const [mapBounds, setMapBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!id) {
      setHeightmap(undefined)
      return
    }
    intervalRef.current = setInterval(async () => {
      const response = await fetch(
        `https://gallery.painkillergis.com/v1/maps/${id}`,
      )
      const heightmap = await response.json()
      setHeightmap(heightmap)
      if (heightmap.imageURL) {
        clearInterval(intervalRef.current!)
      }
    }, 2500)
  }, [id])

  useEffect(() => {
    if (!heightmap) return
    const { left, top, right, bottom } = heightmap.bounds
    setMapBounds(
      worldBoundsToMapBounds(
        new Epsg3857Coordinate(left, top),
        new Epsg3857Coordinate(right, bottom),
        mapState,
      ),
    )
  }, [mapState, heightmap?.bounds])

  return (
    <div
      style={{
        display: heightmap?.imageURL ? 'block' : 'none',
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
        src={heightmap?.imageURL}
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

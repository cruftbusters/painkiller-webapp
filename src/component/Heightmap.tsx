import { useEffect, useRef, useState } from 'react'
import Metadata from '../types/Metadata'

interface HeightmapProps {
  id?: string
}

export default function Heightmap({ id }: HeightmapProps) {
  const [heightmap, setHeightmap] = useState<Metadata>()
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

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.5,
      }}
    >
      <img
        style={{ display: 'block', position: 'absolute' }}
        alt=""
        src={heightmap?.imageURL}
      />
    </div>
  )
}

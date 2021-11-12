import { useEffect, useRef, useState } from 'react'
import Metadata from '../types/Metadata'

export default function useMapMetadata(
  id: string | undefined,
): Metadata | undefined {
  const [metadata, setMetadata] = useState<Metadata>()
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!id) {
      setMetadata(undefined)
      return
    }
    intervalRef.current = setInterval(async () => {
      const response = await fetch(
        `https://gallery.painkillergis.com/v1/maps/${id}`,
      )
      const heightmap = await response.json()
      setMetadata(heightmap)
      if (heightmap.imageURL) {
        clearInterval(intervalRef.current!)
      }
    }, 2500)
  }, [id])

  return metadata
}

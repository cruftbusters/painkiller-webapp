import { useEffect, useRef } from 'react'
import Metadata from '../types/Metadata'

export default function usePollHeightmapURL(
  mapMetadata: Metadata | undefined,
  setMapMetadata: (mapMetadata: Metadata) => void,
) {
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!mapMetadata || mapMetadata.heightmapURL) return

    const poll = async () => {
      const response = await fetch(
        `https://gallery.painkillergis.com/v1/maps/${mapMetadata.id}`,
      )
      const newMapMetadata = await response.json()
      if (newMapMetadata.heightmapURL) {
        setMapMetadata(newMapMetadata)
        clearInterval(intervalRef.current!)
      }
    }
    intervalRef.current = setInterval(poll, 2500)
    poll()
  }, [mapMetadata, setMapMetadata])
}

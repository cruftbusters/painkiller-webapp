import { useEffect, useRef } from 'react'
import Metadata from '../types/Metadata'

export default function usePollImageURL(
  mapMetadata: Metadata | undefined,
  setMapMetadata: (mapMetadata: Metadata) => void,
) {
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!mapMetadata || mapMetadata.imageURL) return

    const poll = async () => {
      const response = await fetch(
        `https://gallery.painkillergis.com/v1/maps/${mapMetadata.id}`,
      )
      const newMapMetadata = await response.json()
      if (newMapMetadata.imageURL) {
        setMapMetadata(newMapMetadata)
        clearInterval(intervalRef.current!)
      }
    }
    intervalRef.current = setInterval(poll, 2500)
    poll()
  }, [mapMetadata, setMapMetadata])
}

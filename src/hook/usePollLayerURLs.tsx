import { useEffect, useRef } from 'react'
import Layout from '../types/Layout'

export default function usePollLayerURLs(
  layout: Layout | undefined,
  setLayout: (layout: Layout) => void,
) {
  const intervalRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (!layout) return
    intervalRef.current = setInterval(async () => {
      const newLayout = await fetchLayout(layout.id)
      if (
        layout.heightmapURL !== newLayout.heightmapURL ||
        layout.hiResHeightmapURL !== newLayout.hiResHeightmapURL ||
        layout.hillshadeURL !== newLayout.hillshadeURL
      ) {
        setLayout(newLayout)
      }
      if (!!newLayout.hillshadeURL && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 2500)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [layout, setLayout])
}

async function fetchLayout(id: string): Promise<any> {
  return await (
    await fetch(`https://layouts.painkillergis.com/v1/layouts/${id}`)
  ).json()
}

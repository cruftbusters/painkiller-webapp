import { useEffect, useRef } from 'react'
import Layout from '../types/Layout'

export default function usePollHeightmapURL(
  layout: Layout | undefined,
  setLayout: (layout: Layout) => void,
) {
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!layout || layout.heightmapURL) return

    const poll = async () => {
      const response = await fetch(
        `https://gallery.painkillergis.com/v1/layouts/${layout.id}`,
      )
      const newLayout = await response.json()
      if (newLayout.heightmapURL) {
        setLayout(newLayout)
        clearInterval(intervalRef.current!)
      }
    }
    intervalRef.current = setInterval(poll, 2500)
    poll()
  }, [layout, setLayout])
}

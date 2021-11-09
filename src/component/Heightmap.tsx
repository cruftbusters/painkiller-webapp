import { useEffect, useRef, useState } from 'react'

interface HeightmapProps {
  id?: string
}

export default function Heightmap({ id }: HeightmapProps) {
  const [url, setURL] = useState()
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!id) {
      setURL(undefined)
      return
    }
    intervalRef.current = setInterval(async () => {
      const response = await fetch(
        `https://gallery.painkillergis.com/v1/heightmaps/${id}`,
      )
      const { imageURL } = await response.json()
      if (imageURL) {
        setURL(imageURL)
        clearInterval(intervalRef.current!)
      }
    }, 2500)
  }, [id])

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <img style={{ display: 'block' }} alt="" src={url} />
    </div>
  )
}
